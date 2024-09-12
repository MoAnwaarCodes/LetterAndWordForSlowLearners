import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const PatientDetail = ({ route, navigation }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dates, setDates] = useState([]);
  const [spcDateData, setSpecDateData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `${global.url}/lernspace/api/User/GetAllAppointmentsDates?pid=${route.params.pId}`,
    );
    const data = await response.json();

    // Remove time from the dates
    const formattedData = data.map(item => ({
      ...item,
      appointmentDate: item.appointmentDate.split(' ')[0],
    }));

    setDates(formattedData);
  };

  const fetchDateData = async (appointmentId) => {
    const response = await fetch(
      `${global.url}/lernspace/api/User/showSpacificAppointmentData?Appointmentid=${appointmentId}&pid=${route.params.pId}`,
    );
    const data = await response.json();
    setSpecDateData(data.PracticeData);
  };

  useEffect(() => {
    fetchData();
  }, [route.params]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.appointmentDate}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.headerText}>
        Details
      </Text>

      <View style={styles.container}>
        {value || isFocus ? (
          <Text style={[styles.label, isFocus && { color: '#4A148C' }]}>
            Select Appointment Date
          </Text>
        ) : null}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#4A148C' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dates}
          search
          maxHeight={300}
          labelField="appointmentDate"
          valueField="id" // Use the id field as the valueField
          placeholder={!isFocus ? 'Select Date' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.id);
            setIsFocus(false);
            fetchDateData(item.id); // Call fetchDateData with the selected id
          }}
          renderItem={renderItem}
        />
      </View>
      <FlatList
        data={spcDateData}
        renderItem={({ item, index }) => (
          <View>
            {index === 0 && (
              <Text style={styles.listItemHeader}>
                {item.type === 'w' ? 'Words' : 'Alphabet'}
              </Text>
            )}
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>{item.eText}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('AddAppointment', route.params);
          }}>
          <Text style={styles.addButtonText}>Add Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            navigation.navigate('TestDetails');
          }}>
          <Text style={styles.secondaryButtonText}>Test Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatientDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3E5F5', // Light purple background
  },
  headerText: {
    color: '#4A148C', // Dark purple color
    fontSize: 34,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#9575CD', // Medium purple border
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#7B1FA2', // Darker purple text
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#7B1FA2',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#7B1FA2',
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#7B1FA2',
  },
  label: {
    fontSize: 14,
    color: '#7B1FA2',
    marginBottom: 5,
  },
  listItemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  listItemHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A148C',
    marginLeft: 18,
  },
  listItemText: {
    fontSize: 16,
    color: '#4A148C',
  },
  listContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 14,
    marginBottom: 20,
  },
  addButton: {
    padding: 15,
    backgroundColor: '#4A148C', // Dark purple color
    paddingVertical: 15,
    borderRadius: 8,
    marginLeft: 14,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    padding: 15,
    backgroundColor: '#9575CD', // Lighter purple color
    paddingVertical: 15,
    borderRadius: 8,
    marginLeft: 14,
  },
  secondaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
