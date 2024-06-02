// import React, {useState, useEffect,useRef } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import DatePicker from 'react-native-modern-datepicker';

// const AddAppointment = ({route, navigation}) => {
//   const [open, setOpen] = useState(false);
//   const [feedback, setFeedback] = useState('');

//   var data = {sending: {}, receivingT: [], receivingP: []};

//   const getTodayDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const todayDate = getTodayDate();
//   const dateRef = useRef('2024-05-15');

//   const handleDateChange = selectedDate => {
//     const formattedDateInput = selectedDate.replace(/\//g, '-');
//     const newDate = new Date(formattedDateInput);

//     if (isNaN(newDate.getTime())) {
//       console.error('Invalid date provided:', selectedDate);
//       return;
//     }

//     const formatDateToSQL = date => {
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       return `${year}-${month}-${day}`;
//     };

//     const sqlDate = formatDateToSQL(newDate);
//     dateRef.current = sqlDate; // Store the date in the ref
//   };
//   useEffect(() => {
//     const obj = route.params;
//     if ('appointmentId' in obj && 'pId' in obj && 'uid' in obj) {
//       data.sending = route.params;
//     } else if ('sending' in obj && 'receivingT' in obj && 'receivingP' in obj) {
//       data.sending = route.params.sending;
//       data.receivingT = route.params.receivingT;
//       data.receivingP = route.params.receivingP;
//     }
//   }, [route.params]);

//   const saveHandler = async () => {
//     const finalData = {
//       Appointment: {
//         userId: data.sending.uid,
//         patientId: data.sending.pId,
//         appointmentDate: date,
//       },
//     };
//     console.log(finalData);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add Appointment</Text>

//       <TextInput
//         style={styles.input}
//         onChangeText={setFeedback}
//         placeholder="Feedback"
//         placeholderTextColor="#888"
//         value={feedback}
//       />
//       <View style={styles.row}>
//         <Text style={styles.label}>Appointment Date:</Text>
//         <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
//           <Text style={styles.buttonText}>Select Date</Text>
//         </TouchableOpacity>
//       </View>
//       {open && (
//         <View style={styles.datePickerContainer}>
//           <DatePicker
//             mode="calendar"
//             selected={dateRef.current}
//             onDateChange={handleDateChange}
//             style={styles.datePicker}
//           />
//           <TouchableOpacity
//             onPress={() => setOpen(false)}
//             style={styles.closeButton}>
//             <Text style={styles.buttonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <View style={styles.row}>
//         <Text style={styles.label}>Add Practice:</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             navigation.navigate('PreDefinePractices', data);
//           }}>
//           <Text style={styles.buttonText}>Add</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Add Test:</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             navigation.navigate('PreDefineTest', data);
//           }}>
//           <Text style={styles.buttonText}>Add</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={styles.saveButton}
//         onPress={() => {
//            console.log(data.sending.uid);
//            console.log(data.sending.pId);
//            console.log(todayDate);
//           console.log(dateRef)
//           const finalData = {};
//         }}>
//         <Text style={styles.buttonText}>Save Appointment</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default AddAppointment;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#e6f7ff',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#004085',
//     textAlign: 'center',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     color: '#333',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: '100%',
//     justifyContent: 'space-between',
//   },
//   label: {
//     color: '#333',
//     fontSize: 18,
//     marginRight: 10,
//   },
//   button: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: '#007bff',
//     borderRadius: 8,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   saveButton: {
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     backgroundColor: '#28a745',
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   closeButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: '#dc3545',
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   datePickerContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   datePicker: {
//     width: '80%',
//   },
// });

import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const AddAppointment = ({route, navigation}) => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [data, setData] = useState({
    sending: {},
    receivingT: [],
    receivingP: [],
  });

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDate();
  const dateRef = useRef(todayDate);

  const handleDateChange = selectedDate => {
    const formattedDateInput = selectedDate.replace(/\//g, '-');
    const newDate = new Date(formattedDateInput);

    if (isNaN(newDate.getTime())) {
      console.error('Invalid date provided:', selectedDate);
      return;
    }

    const formatDateToSQL = date => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const sqlDate = formatDateToSQL(newDate);
    dateRef.current = sqlDate;
  };

  useEffect(() => {
    const params = route.params;
    if (params) {
      if ('appointmentId' in params && 'pId' in params && 'uid' in params) {
        setData(prevData => ({
          ...prevData,
          sending: {
            appointmentId: params.appointmentId,
            pId: params.pId,
            uid: params.uid,
          },
        }));
      } else if (
        'sending' in params &&
        'receivingT' in params &&
        'receivingP' in params
      ) {
        setData({
          sending: params.sending,
          receivingT: params.receivingT,
          receivingP: params.receivingP,
        });
      }
    }
  }, [route.params]);

  const saveHandler = async () => {
    const finalData = {
      Appointment: {
        userId: data.sending.uid,
        patientId: data.sending.pId,
        nextAppointDate: dateRef.current,
        appointmentDate: todayDate,
        feedback: feedback,
      },
      AppointmentPractics: data.receivingP,
      AppointmentTests: data.receivingT,
    };

    console.log(finalData);
    const url = `${global.url}//lernspace/api/user/AddAppointment`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(finalData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data)
      if (data === 'Appointment Add SuccessFully') {
        Alert.alert('Success', 'Appointment added successfully.');
      } else {
        Alert.alert('Error', 'Failed to save data. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to save data. Please try again later.');
    }
  
  
  
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Appointment</Text>

      <TextInput
        style={styles.input}
        onChangeText={setFeedback}
        placeholder="Feedback"
        placeholderTextColor="#888"
        value={feedback}
      />
      <View style={styles.row}>
        <Text style={styles.label}>Appointment Date:</Text>
        <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity>
      </View>
      {open && (
        <View style={styles.datePickerContainer}>
          <DatePicker
            mode="calendar"
            selected={dateRef.current}
            onDateChange={handleDateChange}
            style={styles.datePicker}
          />
          <TouchableOpacity
            onPress={() => setOpen(false)}
            style={styles.closeButton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.label}>Add Practice:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('PreDefinePractices', data);
          }}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Add Test:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('PreDefineTest', data);
          }}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveHandler}>
        <Text style={styles.buttonText}>Save Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddAppointment;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F3E5F5', // Light Purple
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#673AB7', // Dark Purple
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  label: {
    color: '#333',
    fontSize: 18,
    marginRight: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#9575CD', // Medium Purple
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  saveButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#673AB7', // Dark Purple
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#EF5350', // Red
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  datePicker: {
    width: '80%',
  },
});