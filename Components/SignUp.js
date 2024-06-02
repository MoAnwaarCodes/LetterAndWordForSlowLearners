import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

const SignUp = ({ navigation }) => {
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
          console.log(image);
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
      <View style={styles.card}>
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
        </Picker>
        <TextInput
          placeholderTextColor="#888"
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity onPress={imageHandler} style={styles.button}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveHandler} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CFA6F7',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#FFF',
    color: '#333',
  },
  button: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#8A2BE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
