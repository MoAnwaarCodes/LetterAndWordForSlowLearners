import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';

const AddTest = ({route}) => {
  const [question, setQuestion] = useState();
  return (
    <View>
      <Text style={{color: 'black', fontSize: 32, alignSelf: 'center'}}>
        Add Test
      </Text>
      <View>
        <TextInput
          placeholder="Enter Question"
          placeholderTextColor="gray"
          onChangeText={setQuestion}
          style={styles.input}></TextInput>
      </View>
      <Text style={{color: 'black', fontSize: 32, alignSelf: 'center'}}>
        {question}
      </Text>
      
    </View>
  );
};

export default AddTest;

const styles = StyleSheet.create({
  input: {
    fontSize: 24,
    borderColor: 'black',
    borderWidth: 2,
    margin: 8,
    borderRadius: 10,
  },
});
