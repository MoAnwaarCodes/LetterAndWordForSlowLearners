import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const DoctorHome = ({route, navigation}) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // Usage
  const todayDate = getCurrentDate();

  const [todayApp, setTodayApp] = useState([]);
  const fetchAppointment = async () => {
    const url = `${global.url}/LernSpace/api/user/GetAppointments?Did=${route.params.uid}&date=2024-05-11`;
    const response = await fetch(url);
    const appData = await response.json();

    setTodayApp(appData);
  };
  useEffect(() => {
    getCurrentDate();
    fetchAppointment();
  }, [route.params]);

  const [currentDate, setCurrentDate] = useState('');

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <Image
          source={{
            uri: `${global.url}/lernspace${route.params.profPicPath}`,
          }}
          style={{height: 200, width: 200, borderRadius: 100}}
        />
        <View>
          <Text style={{fontSize: 20, color: 'black', marginLeft: 20}}>
            Professional
          </Text>

          <Text
            style={{
              fontSize: 32,
              color: 'black',
              marginLeft: 20,
              fontWeight: 'bold',
            }}>
            {route.params.name}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 32,
          color: 'black',
          marginLeft: 20,
          marginTop: 40,
          fontWeight: 'bold',
        }}>
        Today Appointments
      </Text>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        {todayApp && todayApp.length > 0 ? (
          todayApp.map((item, index) => {
            return (
              <View key={index} style={styles.container}>
                <Image
                  source={{
                    uri: `${global.url}/lernspace${item.profPicPath}`,
                  }}
                  style={{height: 100, width: 100, borderRadius: 100}}
                />
                <TouchableOpacity
                  onPress={() => {
                    const data1 = {
                      appointmentId: item.id,
                      pId: item.patientId,
                    };
                    navigation.navigate('PatientDetail', data1);
                  }}>
                  <View>
                    <Text
                      style={{fontSize: 22, color: 'black', marginLeft: 20}}>
                      {item.name}
                    </Text>
                    <Text
                      style={{fontSize: 22, color: 'black', marginLeft: 20}}>
                      Stage {item.stage}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
            No appointments for today
          </Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddAppointment', route.params);
        }}>
        <Text style={styles.addButtonText}>Assign Practice</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    width: '60%',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
});

export default DoctorHome;
