import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PersonHome = ({ route, navigation }) => {
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
              navigation.navigate('PrePersonPractice', route.params);
            }}>
            <Icon name="book" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Pre Define Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('PrePersonTest', route.params);
            }}>
            <Icon name="flask" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Pre Define Test</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('AddPerson', route.params);
            }}>
            <Icon name="calendar" size={36} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Add New Person</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('AddPersonPractice', route.params);
            }}>
            <Icon
              name="person-add"
              size={36}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Add Person Practice</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('TwoPersonTest', route.params);
            }}>
            <Icon
              name="person-add"
              size={36}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Add Two Person Test</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('AddPersonTest', route.params);
            }}>
            <Icon
              name="person-add"
              size={36}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Register Person</Text>
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
    backgroundColor: '#F0E6FA', // Light purple background
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#5E4B8C', // Dark purple text
    textAlign: 'center',
    fontFamily: 'Avenir', // Modern font
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
    backgroundColor: '#A18CD1', // Light purple button
    width: '45%', // Adjusting width to fit two buttons per row with some margin
    aspectRatio: 1, // Ensures the button is a square
    borderRadius: 20, // More rounded corners
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 20, // Increased margin bottom for spacing
  },
  icon: {
    marginBottom: 10, // Increased margin for better spacing
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600', // Semi-bold for better readability
    textAlign: 'center',
    paddingHorizontal: 5, // Added padding for better text appearance
  },
  
});

export default PersonHome;
