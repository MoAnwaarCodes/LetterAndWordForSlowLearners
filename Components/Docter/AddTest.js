import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { Picker } from '@react-native-picker/picker';

const AddTest = ({ route }) => {
  const [question, setQuestion] = useState('');
  const [collection, setCollection] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [type, setType] = useState(1);
const [title, setTitle]=useState('');
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

  const toggleSelectItem = id => {
    const isSelected = selectedItems.find(item => item.id === id);
    const updatedCollection = collection.map(item => {
      if (item.id === id) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    const selectedCount = updatedCollection.filter(item => item.isChecked)
      .length;

    if ((isSelected && selectedCount <= 4) || (!isSelected && selectedCount <= 4)) {
      updateSelectedItems(updatedCollection);
    } else {
      Alert.alert('Oops', 'You can only select up to 4 options.');
    }
  };

  const updateSelectedItems = updatedCollection => {
    const selected = updatedCollection.filter(item => item.isChecked);

    let selectedItemsObject = {};

    selected.forEach((item, index) => {
      if (index === 0) {
        selectedItemsObject['questionTitle'] = question;
        selectedItemsObject['collectid'] = item.id;
      } else {
        selectedItemsObject[`op${index}`] = item.id;
      }
    });

    const selectedItemsArray = [selectedItemsObject];

    setSelectedItems(selectedItemsArray);
  };

  const saveHandler = async () => {
    const finalData = {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Test</Text>
      <View style={styles.inputContainer}>
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
        style={styles.picker}
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
        <Picker.Item label="Stage 1" value="1" />
        <Picker.Item label="Stage 2" value="2" />
      </Picker>

      <View style={styles.groupContainer}>
        {collection.map(item => (
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
      <TouchableOpacity style={styles.addButton} onPress={saveHandler}>
        <Text style={styles.addButtonText}>Create Test</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4EEFF',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 32,
    alignSelf: 'center',
    marginBottom: 20,
    color: '#6C3483',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    color: 'black',
  },
  picker: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    color: 'black',
  },
  groupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
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
    color: 'black',
  },
  addButton: {
    backgroundColor: '#9b59b6',
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

export default AddTest;
