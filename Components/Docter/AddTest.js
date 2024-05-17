import {StyleSheet, Text, View, TextInput, Button, Alert,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CheckBox from 'react-native-check-box';
import {SelectList} from 'react-native-dropdown-select-list';
import {Picker} from '@react-native-picker/picker';

const AddTest = ({route}) => {
  const [question, setQuestion] = useState('');
  const [collection, setCollection] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [type, setType] = useState(1);
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

    const toggleSelectItem = id => {
      const isSelected = selectedItems.find(item => item.id === id);
      const updatedCollection = collection.map(item => {
        if (item.id === id) {
          item.isChecked = !item.isChecked;
        }
        return item;
      });
      const selectedCount = updatedCollection.filter(
        item => item.isChecked,
      ).length;

      if (
        (isSelected && selectedCount <= 4) ||
        (!isSelected && selectedCount <= 4)
      ) {
        updateSelectedItems(updatedCollection);
      } else {
        alert('Oops, you can only select up to 4 options.');
      }
    };

    // const updateSelectedItems = updatedCollection => {
    //   const selected = updatedCollection.filter(item => item.isChecked);
    //   const selectedItemsArray = selected.map((item, index) => {
    //     if (index === 0) {
    //       return {collectid: item.id};
    //     } else {
    //       return {[`op${index}`]: item.id};
    //     }
    //   });
    //   setSelectedItems(selectedItemsArray);
    // };

    const updateSelectedItems = updatedCollection => {
      const selected = updatedCollection.filter(item => item.isChecked);

      // Initialize an object to store the selected items
      let selectedItemsObject = {};

      selected.forEach((item, index) => {
        if (index === 0) {
          // For the first selected item, assign collectid key
          selectedItemsObject['questionTitle'] = question;
          selectedItemsObject['collectid'] = item.id;
        } else {
          // For subsequent selected items, assign op${index} key
          selectedItemsObject[`op${index}`] = item.id;
        }
      });

      // Push the selected items object into an array
      const selectedItemsArray = [selectedItemsObject];

      // Set the selected items array to state
      setSelectedItems(selectedItemsArray);
    };

    

    return (
      <View>
        {Object.keys(groupedData).map(group => (
          <View key={group} style={styles.groupContainer}>
            <Text style={styles.groupHeaderText}>{group}</Text>
            {groupedData[group].map(item => (
              <CheckBox
                key={item.id}
                isChecked={item.isChecked || false}
                rightTextStyle={styles.normalText}
                rightText={item.eText}
                onClick={() => toggleSelectItem(item.id)}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  const saveHandler = async () => {
    finalData = {
      test: {
        createBy: route.params.uid,
        stage: type,
        title: title,
      },
      collectionsIds: selectedItems,
    };
    console.log(finalData);
    const url = `${global.url}/LernSpace/api/Test/AddNewTest`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(finalData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data === 'Data Save') {
        Alert.alert('Success', 'Test added successfully.');
      } else {
        Alert.alert('Error', 'Failed to save data. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to save data. Please try again later.');
    }
  };

  const [title, setTitle] = useState('');
  useEffect(() => {
    fetchCollection();
  }, []);

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
          style={styles.input}
        />
      </View>
      <TextInput
        placeholder="Enter Title"
        placeholderTextColor="gray"
        onChangeText={setTitle}
        style={styles.input}
      />
      <Picker
        style={styles.input1}
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
        <Picker.Item label="Stage 1" value="1" />
        <Picker.Item label="Stage 2" value="2" />
      </Picker>

      <GroupedData />
      <TouchableOpacity style={styles.addButton} onPress={saveHandler}>
        <Text style={styles.addButtonText}>Create Test</Text>
      </TouchableOpacity>
    
    </View>
  );
};

export default AddTest;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#007bff',
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
  input1: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    color: '#333',
    marginLeft: 10,
  },
  input: {
    fontSize: 24,
    borderColor: 'black',
    borderWidth: 2,
    margin: 8,
    borderRadius: 10,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 32,
    alignSelf: 'center',
    marginBottom: 20,
  },
  groupContainer: {
    marginLeft: 8,
    marginBottom: 20,
  },
  groupHeaderText: {
    fontWeight: 'bold',
    fontSize: 34,
    marginBottom: 5,
    color: 'black',
  },
  normalText: {
    fontSize: 24,
    color: 'black',
  },
});
