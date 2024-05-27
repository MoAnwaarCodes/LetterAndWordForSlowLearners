// import React, { useState, useEffect } from 'react';
// import { Alert, StyleSheet, Text, View } from 'react-native';

// const PatientDetail = ({ route }) => {
//   const [appointmentData, setAppointmentData] = useState(null);

//   const fetchDetails = async () => {
//     try {
//       const url = `${global.url}/lernspace/api/User/showSpacificAppointmentData?AppointmentId=${route.params.appointmentId}&pid=${route.params.pId}`;

//       const response = await fetch(url);

//       if (response.ok) {
//         const result = await response.json();
//         setAppointmentData(result);
//       } else {
//         Alert.alert('Error', 'Failed to fetch appointment details');
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   useEffect(() => {
//     fetchDetails();
//   }, [route.params]);

//   return (
//     <View style={styles.container}>
//       <Text>PatientDetail</Text>

//       {appointmentData && (
//         <View>
//           <Text style={{fontSize:25,color:"black"}}>{JSON.stringify(appointmentData)}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default PatientDetail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const PatientDetail = ({route, navigation}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dates, setDates] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `${global.url}/lernspace/api/User/GetAllAppointmentsDates?pid=${route.params.pId}`,
    );
    const data = await response.json();
    setDates(data);
  };

  useEffect(() => {
    fetchData();
  }, [route.params]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.appointmentDate}</Text>
      </View>
    );
  };
  const [spcDateData, setSpecDateData] = useState([]);

  const fetchDateData = async () => {
    const response = await fetch(
      `${global.url}/lernspace/api/User/showSpacificAppointmentData?Appointmentid=${value}&pid=${route.params.pId}`,
    );
    const data = await response.json();
    setSpecDateData(data.PracticeData);
  };

  return (
    <View>
      <Text
        style={{
          color: 'black',
          fontSize: 40,
          alignSelf: 'center',
          fontWeight: 'bold',
        }}>
        Details
      </Text>

      <View style={styles.container}>
        {value || isFocus ? (
          <Text style={[styles.label, isFocus && {color: 'black'}]}>
            Dropdown label
          </Text>
        ) : null}
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dates}
          search
          maxHeight={300}
          labelField="appointmentDate"
          valueField="appointmentDate"
          placeholder={!isFocus ? 'Select Date' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.id);
            setIsFocus(false);
            fetchDateData();
          }}
          renderItem={renderItem}
        />
      </View>
      <FlatList
        data={spcDateData}
        renderItem={({item, index}) => (
          <View>
            {index === 0 && (
              <Text style={styles.listItemHeader}>
                {item.type === 'w' ? 'Words' : 'Alphabet'}
              </Text>
            )}
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>{item.eText}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('AddAppointment');
          }}>
          <Text style={styles.addButtonText}>Add Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('TestDetails');
          }}>
          <Text style={styles.addButtonText}>Test Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatientDetail;

const styles = StyleSheet.create({
  addButton: {
    padding: 15,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    marginRight: 14,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  listItemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItemHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    marginLeft: 18,
  },
  listItemText: {
    fontSize: 16,
    color: 'black',
  },
  listContainer: {
    paddingBottom: 20,
  },
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#888',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
});
