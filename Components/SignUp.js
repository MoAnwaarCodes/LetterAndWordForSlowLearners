import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('doctor');
  const [image, setImage] = useState('');

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

  const saveHandler = async () => {
    console.log('Clicked');
    var formData = new FormData();
    formData.append('profilePic', image);
    formData.append('name', name);
    formData.append('username', userName);
    formData.append('password', password);
    formData.append('type', type);

    const url = `${global.url}/LernSpace/api/user/SignUp`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result == 'registerd') {
          navigation.navigate('SignIn');
          console.log(result);
          console.log(image)
        }
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signUpText}>Sign Up</Text>
      <TextInput
        placeholderTextColor="#888"
        onChangeText={setName}
        placeholder="Enter Your Full Name"
        style={styles.input}
      />
      <TextInput
        placeholder="Enter UserName"
        onChangeText={setUserName}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <Picker
        style={styles.input}
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
        <Picker.Item label="Doctor" value="doctor" />
        <Picker.Item label="Caretaker" value="caretaker" />
        <Picker.Item label="Patient" value="patient" />
      </Picker>
      <TextInput
        placeholderTextColor="#888"
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity onPress={imageHandler}>
        <Text style={styles.button}>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={saveHandler}>
        <Text style={styles.button}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  signUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    height: 40,
    width: '80%',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'blue',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
