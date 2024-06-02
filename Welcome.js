import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8A2BE4', // Light purple background color
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // White text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#B98AF0', // Lighter purple button color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 100,
    width: 100,
    marginVertical: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
