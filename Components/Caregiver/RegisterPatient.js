import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';

const RegisterPatient = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [age, setAge] = useState('');
  const [stage, setStage] = useState('1'); // Stage should be a string
  const [gender, setGender] = useState('male'); // Default gender should be lowercase

  const imageHandler = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
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

    if (image) {
      // Check if image is defined
      formData.append('profpic', image);
    }

    formData.append('name', name);
    formData.append('age', parseInt(age)); // Parse age as a number
    formData.append('stage', parseInt(stage));
    formData.append('gender', gender);
    formData.append('username', userName);
    formData.append('password', password);
    formData.append('caregiverid', route.params.uid);
    console.log(formData);
    const url = `${global.url}/LernSpace/api/user/CaregiverRegisterPatient`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.json();
      if (data === 'registerd') {
        navigation.navigate('SignIn');
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
        placeholderTextColor="#888"
        onChangeText={setAge}
        placeholder="Enter Your Age"
        style={styles.input}
        keyboardType="numeric" // Set keyboard type to numeric
      />
      <Picker
        style={styles.input}
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={stage}
        onValueChange={(itemValue, itemIndex) => setStage(itemValue)}>
        <Picker.Item label="Stage 1" value="1" />
        <Picker.Item label="Stage 2" value="2" />
      </Picker>
      <TextInput
        placeholder="Enter UserName"
        onChangeText={setUserName}
        style={styles.input}
        placeholderTextColor="#888"
      />
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

export default RegisterPatient;

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
