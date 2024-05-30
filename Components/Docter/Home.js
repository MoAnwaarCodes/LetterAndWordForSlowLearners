import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({ route, navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Welcome Back, {route.params.name}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('PreDefinePractices', route.params);
            }}>
            <Icon name="book" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Practices</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('PreDefineTest', route.params);
            }}>
            <Icon name="flask" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Tests</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('DoctorHome', route.params);
            }}>
            <Icon name="calendar" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Appointments</Text>
          </TouchableOpacity>
          {(route.params.type === 'caretaker' || route.params.type === 'Caregiver') && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('RegisterPatient', route.params);
              }}>
              <Icon name="person-add" size={36} color="#fff" style={styles.icon} />
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.slopeContainer}>
        <View style={styles.slopeLine1} />
        <View style={styles.slopeLine2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    position: 'relative',
  },
  headerContainer: {
    marginTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4A56E2',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A56E2',
    width: '45%', // Adjusting width to fit two buttons per row with some margin
    aspectRatio: 1, // Ensures the button is a square
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  icon: {
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slopeContainer: {
    width: '100%',
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  slopeLine1: {
    width: '200%',
    height: '100%',
    backgroundColor: '#E9B6BF',
    transform: [{ skewY: '10deg' }],
    position: 'absolute',
    top: 40,
  },
  slopeLine2: {
    width: '200%',
    height: '100%',
    backgroundColor: '#9474CC',
    transform: [{ skewY: '10deg' }],
    position: 'absolute',
    top: 60,
  },
});

export default Home;
