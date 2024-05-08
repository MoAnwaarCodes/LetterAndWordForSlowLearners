import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import CheckBox from 'react-native-check-box';

const AddTest = ({route}) => {
  const [question, setQuestion] = useState();
  const [collection, setCollection] = useState();
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
          style={styles.input}></TextInput>
      </View>
      <GroupedData />
    </View>
  );
};

export default AddTest;

const styles = StyleSheet.create({
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
   marginLeft:8,
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
