import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PatientHome = ({ route, navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Welcome Back : {route.params.name}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('PatientPractice', route.params);
            }}>
            <Icon name="book-outline" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Attempt Practices</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('PatientTest', route.params);
            }}>
            <Icon name="flask-outline" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Attempt Test</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('AttemptTwoPersonTest', route.params);
            }}>
            <Icon name="person-outline" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Attempt Two Person Test</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // navigation.navigate('AnotherScreen', route.params);
            }}>
            <Icon name="camera-outline" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Facial Recognition</Text>
          </TouchableOpacity>
       */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('PIdentify', route.params);
            }}>
            <Icon name="flask-outline" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Two Person Identify</Text>
          </TouchableOpacity>
       
      
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
    backgroundColor: '#F0E6FA',
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
    marginBottom: 10,
  },
  icon: {
    marginBottom: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
});

export default PatientHome;
