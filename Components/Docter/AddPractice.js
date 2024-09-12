import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import CheckBox from 'react-native-check-box';

const AddPractice = ({ route }) => {
  const [collection, setCollection] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [stage, setStage] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      const url = `${global.url}/lernspace/api/Collection/GetAllCollection`;
      const response = await fetch(url);
      const data = await response.json();
      setCollection(data);
    } catch (error) {
      console.error('Error fetching collection:', error);
      Alert.alert(
        'Error',
        'Failed to fetch collection data. Please try again later.',
      );
    }
  };

  const toggleSelectGroup = group => {
    const updatedCollection = collection.map(item => {
      if (item.C_group === group) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setCollection(updatedCollection);
    updateSelectedItems(updatedCollection);
  };

  const toggleSelectItem = itemId => {
    const updatedCollection = collection.map(item => {
      if (item.id === itemId) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setCollection(updatedCollection);
    updateSelectedItems(updatedCollection);
  };

  const updateSelectedItems = updatedCollection => {
    const selected = updatedCollection.filter(item => item.isChecked);
    setSelectedItems(selected.map(item => ({ collectid: item.id })));
  };

  const GroupedData = () => {
    if (!collection) return null;

    const groupedData = {};

    // Grouping the data based on C_group
    collection.forEach(item => {
      if (!groupedData[item.C_group]) {
        groupedData[item.C_group] = [];
      }
      groupedData[item.C_group].push(item);
    });

    return (
      <View>
        {Object.keys(groupedData).map(group => (
          <View key={group} style={styles.groupContainer}>
            <CheckBox
              isChecked={groupedData[group].every(item => item.isChecked)}
              leftTextStyle={styles.groupHeaderText}
              leftText={`${group}`}
              onClick={() => toggleSelectGroup(group)}
            />
            <View style={styles.rowContainer}>
              {groupedData[group].map(item => (
                <View key={item.id} style={styles.itemContainer}>
                  <Image
                    source={{ uri: `${global.url}/lernspace${item.picPath}` }}
                    style={styles.image}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.normalText}>{item.eText}</Text>
                  </View>
                  <CheckBox
                    isChecked={item.isChecked || false}
                    onClick={() => toggleSelectItem(item.id)}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const saveHandler = async () => {
    const finalData = {
      practice: {
        stage: stage,
        title: title,
        createBy: route.params.uid,
      },
      collections: selectedItems,
    };

    console.log("Final  Data",finalData)
    const url = `${global.url}/LernSpace/api/practice/AddNewPractice`;

    console.log(finalData);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(finalData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        Alert.alert('Success', 'Practice added successfully.');
      } else {
        Alert.alert('Error', 'Failed to save data. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to save data. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Add Practice</Text>
        <TextInput
          placeholder="Enter Stage"
          placeholderTextColor="gray"
          onChangeText={setStage}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Title"
          placeholderTextColor="gray"
          onChangeText={setTitle}
          style={styles.input}
        />
        <GroupedData />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            saveHandler()
          
          }}>
          <Text style={styles.addButtonText}>Create Practice</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#F4EEFF', // Light purple background color
  },
  container: {
    flex: 1,
    backgroundColor: '#F4EEFF', // Light purple background color
    padding: 20,
  },
  header: {
    fontSize: 32,
    alignSelf: 'center',
    marginBottom: 20,
    color: '#6C3483', // Dark purple header text color
  },
  input: {
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D5D8DC', // Light gray border color
    borderRadius: 8,
    color: '#6C3483', // Dark purple text color
    backgroundColor: '#FFF', // White background color for inputs
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupHeaderText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    color: '#6C3483', // Dark purple text color
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%', // Adjust width to fit two boxes in a row with space between them
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  normalText: {
    fontSize: 18,
    color: '#6C3483', // Dark purple text color
  },
  addButton: {
    backgroundColor: '#6C3483', // Dark purple button color
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddPractice;
``
