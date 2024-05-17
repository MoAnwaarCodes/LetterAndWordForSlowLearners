import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({ route, navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Welcome Back {route.params.name}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('PreDefinePractices', route.params);
          }}>
          <Icon name="book" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Show Practices</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('PreDefineTest', route.params);
          }}>
          <Icon name="flask" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Show Tests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('DoctorHome', route.params);
          }}>
          <Icon name="calendar" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Today's Appointment</Text>
        </TouchableOpacity>

        {route.params.type === 'caretaker' ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('RegisterPatient', route.params);
            }}>
            <Icon name="person-add" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Register Patient</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
      {/* <View style={styles.slopeContainer}>
        <View style={styles.slopeLine} />
        <View style={styles.slopeLine2} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1, // This ensures the container takes up available space
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#5A67D8',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // slopeContainer: {
  //   width: '100%',
  //   height: 80,
  //   marginTop: 50,
  //   position: 'absolute', // This ensures the slopes don't interfere with other elements
  //   bottom: 0, // Align the slopes at the bottom of the container
  // },
  // slopeLine: {
  //   width: '100%',
  //   height: '50%',
  //   backgroundColor: '#E9B6BF',
  //   transform: [{ skewY: '20deg' }],
  //   position: 'absolute',
  //   bottom: 40,
  // },
  // slopeLine2: {
  //   width: '100%',
  //   height: '80%',
  //   backgroundColor: '#9474CC',
  //   transform: [{ skewY: '20deg' }],
  //   position: 'absolute',
  //   bottom: 0,
  // },
});

export default Home;
