import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const DoctorHome = ({route, navigation}) => {
  const [todayApp, setTodayApp] = useState([]);
  const fetchAppointment = async () => {
    const url = `${global.url}/LernSpace/api/user/GetAppointments?Did=${route.params.uid}&date=2024-03-18 `;
    const response = await fetch(url);
    const appData = await response.json();

    setTodayApp(appData);
  };
  useEffect(() => {
    getCurrentDate();
  fetchAppointment()
  }, [route.params]);

  const [currentDate, setCurrentDate] = useState('');

  const getCurrentDate = () => {
    const currentDate = new Date();
    const sqlFormattedDate = currentDate.toISOString().split('T')[0];
    setCurrentDate(sqlFormattedDate);
  };
  return (
    <View>
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
      {todayApp && todayApp.length > 0
        ? todayApp.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 20,
                }}>
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
                      pId: item.pid,
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
        : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default DoctorHome;
