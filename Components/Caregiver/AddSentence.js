import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
const AddSentence = () => {
  const [sentence, setSentence] = useState('');

  const submitHandler = async () => {
    const Data = new FormData();

    Data.append('sentence', sentence);


    try {
      const response = await fetch(
        `http://192.168.43.188/lernspace/api/user/addSentence`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: Data,
        },
      );
      const data = await response.json();
      if(data==='registerd'){
        Alert.alert('Registered Successfully')
      }
     console.log(data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text
        style={{
          color: 'black',
          fontSize: 24,
          alignSelf: 'center',
          fontWeight: 800,
        }}>
        Enter Sentence
      </Text>

      <Text
        style={{
          color: 'black',
          fontSize: 18,
          alignSelf: 'center',
          margin: 10,
          color: 'red',
        }}>
        Note: Enter Sentence like this. I Like [Name1] and [Name2]
      </Text>

      <TextInput
        placeholder="Enter Sentence"
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={setSentence}
      />
      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSentence;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#FFF',
    color: '#333',
    width: '80%',
    alignSelf: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#8A2BE4',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
