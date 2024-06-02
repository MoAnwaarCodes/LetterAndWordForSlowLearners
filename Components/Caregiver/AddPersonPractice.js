import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import CheckBox from 'react-native-check-box';

const AddPersonPractice = ({route, navigation}) => {
  const [personData, setPersonData] = useState([]);
  const [title, setTitle] = useState('');
  const [collectionData, setCollectionData] = useState([]);
  const [reciveDataCheck, setReciveDataCheck] = useState({userId: '', pid: ''});

  const fetchPerson = async () => {
    try {
      const url = `${global.url}/lernspace/api/Person/GetPersons?cid=${route.params.uid}`;
      const response = await fetch(url);
      const result = await response.json();
      setPersonData(result);
    } catch (error) {
      console.log('Error fetching persons:', error);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, [route.params.uid]);

  const toggleSelectItem = id => {
    setPersonData(prevData =>
      prevData.map(item =>
        item.id === id ? {...item, isChecked: !item.isChecked} : item,
      ),
    );
    setCollectionData(prevData =>
      prevData.some(obj => obj.personPractice === id)
        ? prevData.filter(obj => obj.personPractice !== id)
        : [...prevData, {personPractice: id}],
    );
  };

  const newprac = async () => {
    if (title && collectionData.length) {
      try {
        const dataa = {
          PersonPractice: {
            title: title,
            createdBy: route.params.uid,
            patientId: 7,
          },
          Persons: collectionData,
        };
        console.log(dataa);

        const response = await fetch(
          `${global.url}/lernspace/api/Person/Addpractice`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataa),
          },
        );
        const res = await response.json();
        console.log(res);
      } catch (error) {
        console.log('Data not saved:', error);
      }
    } else {
      console.log('Incomplete data');
    }
  };

  const renderItems = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => toggleSelectItem(item.id)}>
        <Image
          source={{uri: `${global.url}/lernspace${item.picPath}`}}
          style={styles.image}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.defaultText}>Name: {item.name}</Text>
          <Text style={styles.defaultText}>Relation: {item.relation}</Text>
          <CheckBox
            leftTextStyle={styles.defaultText}
            isChecked={item.isChecked || false}
            onClick={() => toggleSelectItem(item.id)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Person Practice</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="black"
        style={[styles.input, styles.defaultText]}
      />

      <FlatList
        data={personData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItems}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />

      <TouchableOpacity style={styles.button} onPress={newprac}>
        <Text style={styles.buttonText}>Save Practice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPersonPractice;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F3E5F5', // Light Purple
    },
    defaultText: {
      color: '#333', // Dark Grey
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
      color: '#6200EE', // Dark Purple
    },
    input: {
      height: 40,
      borderColor: '#6200EE', // Dark Purple
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: '#fff', // White
      borderRadius: 5,
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    itemContainer: {
      flex: 1,
      backgroundColor: '#fff', // White
      borderRadius: 10,
      padding: 10,
      margin: 5,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    itemTextContainer: {
      alignItems: 'center',
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: '#6200EE', // Dark Purple
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff', // White
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  