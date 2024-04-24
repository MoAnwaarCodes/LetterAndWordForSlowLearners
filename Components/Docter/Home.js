import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Home = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Home</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('PreDefinePractices', route.params);
        }}
      >
        <Text style={styles.buttonText}>Show Practices</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('PreDefineTest', route.params);
        }}
      >
        <Text style={styles.buttonText}>Show Tests</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 3, // Add shadow
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
