import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const SignIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const url = `${global.url}/LernSpace/api/user/signin?username=${username}&password=${password}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data === 'invalid Username Or Password') {
      Alert.alert(data);
    } else {
      // navigation.navigate('UserDefinePractice', data);
      if (data.type === 'doctor'||data.type === 'caretaker') {
        // navigation.navigate('DoctorHome', data);
        navigation.navigate('PreDefinePractices', data);
      }
      console.log(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signInText}>Sign In</Text>
      <TextInput
        placeholderTextColor="#888"
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholderTextColor="#888"
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  signInText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    width: '80%',
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
