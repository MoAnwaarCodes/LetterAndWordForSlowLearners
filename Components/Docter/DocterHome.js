import React, { useEffect, useState } from 'react';
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

const DoctorHome = ({ route, navigation }) => {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: `${global.url}/lernspace${route.params.profPicPath}` }}
          style={styles.profileImage}
        />
        <View style={styles.profileText}>
          <Text style={styles.professionText}>Professional</Text>
          <Text style={styles.nameText}>{route.params.name}</Text>
        </View>
      </View>
      <Text style={styles.sectionHeading}>Today's Appointments</Text>
      {todayApp && todayApp.length > 0 ? (
        todayApp.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.appointment}
            onPress={() =>
              navigation.navigate('PatientDetail', {
                appointmentId: item.id,
                pId: item.patientId,
                uid: route.params.uid,
              })
            }>
            <Image
              source={{ uri: `${global.url}/lernspace${item.profPicPath}` }}
              style={styles.patientImage}
            />
            <View style={styles.appointmentDetails}>
              <Text style={styles.patientName}>{item.name}</Text>
              <Text style={styles.stageText}>Stage {item.stage}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noAppointmentText}>No appointments for today</Text>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAppointment', route.params)}>
        <Text style={styles.addButtonText}>Assign Practice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 50,
  },
  profileText: {
    marginLeft: 20,
  },
  professionText: {
    fontSize: 25,
    color: '#888',
  },
  nameText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  sectionHeading: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 40,
  },
  appointment: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 20,
    marginTop: 10,
  },
  patientImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  appointmentDetails: {
    marginLeft: 20,
  },
  patientName: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  stageText: {
    fontSize: 16,
    color: '#666',
  },
  noAppointmentText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 40,
    alignSelf: 'center',
    width: '60%',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DoctorHome;
