import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const AddAppointment = ({route, navigation}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('2023-05-22');
  const [feedback, setFeedback] = useState('');

  var data = {sending: {}, receivingT: [], receivingP: []};
  const handleDateChange = selectedDate => {
    setDate(selectedDate);
  };

  useEffect(() => {
    // const params = route.params;
    // if (params && !Array.isArray(params) && typeof params === 'object') {
    //   data.sending = route.params;
    // } else if (Array.isArray(params)) {
    //   // const [uData, practice, test] = params;
    //   // if (uData) setUserData(uData);
    //   // if (practice) setPracticeData(practice);
    //   // if (test) setTestData(test);

    const obj = route.params;
    if ('appointmentId' in obj && 'pId' in obj && 'uid' in obj) {
      data.sending = route.params;
    } else if ('sending' in obj && 'receivingT' in obj && 'receivingP' in obj) {
      data.sending = route.params.sending;
      data.receivingT = route.params.receivingT;
      data.receivingP = route.params.receivingP;
    }
  }, [route.params]);

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
            selected={date}
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

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          console.log('Sending', data.sending);
          console.log('Practice', data.receivingP);
          console.log('Test', data.receivingT);
        }}>
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
    backgroundColor: '#e6f7ff',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004085',
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
    shadowOffset: {width: 0, height: 2},
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
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  saveButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
