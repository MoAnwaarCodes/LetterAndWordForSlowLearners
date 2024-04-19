import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

const PatientDetail = ({ route }) => {
  const [appointmentData, setAppointmentData] = useState(null);

  const fetchDetails = async () => {
    try {
      const url = `${global.url}/lernspace/api/User/showSpacificAppointmentData?AppointmentId=${route.params.appointmentId}&pid=${route.params.pId}`;

      const response = await fetch(url);
      
      if (response.ok) {
        const result = await response.json();
        setAppointmentData(result);
      } else {
        Alert.alert('Error', 'Failed to fetch appointment details');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text>PatientDetail</Text>
      
      {appointmentData && (
        <View>
          <Text style={{fontSize:25,color:"black"}}>{JSON.stringify(appointmentData)}</Text>
        </View>
      )}
    </View>
  );
};

export default PatientDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

