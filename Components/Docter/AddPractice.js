import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';
import CheckBox from 'react-native-check-box';

const AddPractice = ({route}) => {
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
    setSelectedItems(selected.map(item => ({collectid: item.id})));
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
      practice: {
        stage: stage,
        title: title,
        createBy: route.params.uid,
      },
      collections: selectedItems,
    };
    const url = `${global.url}/LernSpace/api/practice/AddNewPractice`;

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
      <Button title="Add Practice" onPress={saveHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color:'black'
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
  },
  normalText: {
    fontSize: 18,
    color: 'black',
  },
});

export default AddPractice;
