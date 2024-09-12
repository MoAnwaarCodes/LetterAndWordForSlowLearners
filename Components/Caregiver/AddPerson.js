import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-modern-datepicker';

const AddPerson = ({route}) => {
  const handleSubmit = async e => {
    const Data = new FormData();
    Data.append('name', name);
    Data.append('relation', relation);

    Data.append('personPic', image.uri);

    // Checking if caregiverId exists in reciveDataCheck

    Data.append('addBy', route.params.uid);
    Data.append('age', age);
    Data.append('gender', gender);
    //Data.append('audio', formData.audio);

    try {
      const response = await fetch(
        `${global.url}/lernspace/api/Person/UploadPersonData`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: Data,
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const imageHandler = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Image selection cancelled');
      } else {
        setImage({
          name: response.assets[0].fileName,
          uri: response.assets[0].uri,
          type: response.assets[0].type,
        });
      }
    });
  };

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
    setDateOfBirth(sqlDate);
  };

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [personPic, setPersonPic] = useState();
  const [dateOfBirth, setDateOfBirth] = useState('2024-01-01');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Person</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="gray"
        />
        <TextInput
          onChangeText={setRelation}
          style={styles.input}
          placeholder="Relation"
          placeholderTextColor="gray"
        />
        <TextInput
          onChangeText={setAge}
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="gray"
        />
        <TextInput
          onChangeText={setGender}
          style={styles.input}
          placeholder="Gender"
          placeholderTextColor="gray"
        />

        <TouchableOpacity onPress={imageHandler} style={styles.imageButton}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          console.log(image)
        }} style={styles.imageButton}>
          <Text style={styles.buttonText}>Click Me</Text>
        </TouchableOpacity>
        
        <View style={styles.row}>
          <Text style={styles.label}>Appointment Date:</Text>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.dateButton}>
            <Text style={styles.buttonText}>Select Date</Text>
          </TouchableOpacity>
        </View>
        {open && (
          <View style={styles.datePickerContainer}>
            <DatePicker
              mode="calendar"
              selected={dateOfBirth}
              onDateChange={handleDateChange}
              style={styles.datePicker}
            />
            <TouchableOpacity
              onPress={() => setOpen(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            console.log(image);
            handleSubmit();
          }}
          style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPerson;

const styles = StyleSheet.create({
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
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  imageButton: {
    height: 40,
    borderColor: '#6A1B9A',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#6A1B9A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateButton: {
    height: 40,
    borderColor: '#6A1B9A',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#6A1B9A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    height: 40,
    borderColor: '#6A1B9A',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    backgroundColor: '#4A148C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EDE7F6',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#4A148C',
    marginBottom: 16,
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    height: 40,
    borderColor: '#9575CD',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: '#4A148C',
    borderRadius: 10,
  },
  datePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  datePicker: {
    width: '100%',
    backgroundColor: '#EDE7F6',
    borderRadius: 8,
  },
});
