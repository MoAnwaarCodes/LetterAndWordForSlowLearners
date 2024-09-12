import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const PreDefinePractices = ({route, navigation}) => {
  const [practice, setPractice] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [practiceCollection, setPracticeCollection] = useState([]);

  const fetchData = async () => {
    try {
      const params = route.params;

      const url = `${global.url}/LernSpace/api/practice/getPractices?Uid=${route.params.sending.uid}`;
      const url1 = `${global.url}/LernSpace/api/practice/getPractices?Uid=${route.params.uid}`;
      if (
        'sending' in params &&
        'receivingT' in params &&
        'receivingP' in params
      ) {
        const response = await fetch(url);
        const data = await response.json();
        if (data === 'data not found') {
          setPractice([]);
        } else {
          setPractice(data);
        }
      } else {
        const response = await fetch(url1);
        const data = await response.json();
        if (data === 'data not found') {
          setPractice([]);
        } else {
          setPractice(data);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route.params]);

  const toggleDropdown = async item => {
    const url = `${global.url}/LernSpace/api/practice/getPracticeDetail?pid=${item.id}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPracticeCollection(data);
      console.log(practice);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setExpandedItem(expandedItem === item ? null : item);
  };
  const [checkedItems, setCheckedItems] = useState({});
  const handleValueChange = id => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleButtonClick = () => {
    const checkedArray = Object.keys(checkedItems)
      .filter(key => checkedItems[key])
      .map(key => practice.find(item => item.id === parseInt(key)).id);

    const formattedArray = checkedArray.map(id => ({practiceId: id}));

    //  setArray(checkedArray);
    return formattedArray;
  };
  const renderItem = ({item, index}) => {
    const colors = ['#9AD', '#A5C'];

    const backgroundColor = colors[index % colors.length];
    const isExpanded = expandedItem === item;

    return (
      <View style={{flexDirection: 'row'}}>
        <CheckBox
          value={!!checkedItems[item.id]}
          onValueChange={() => handleValueChange(item.id)}
          style={styles.checkbox}
          tintColors={{true: 'black', false: 'black'}}
        />

        <View style={styles.itemContainer} key={index}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor}]}
            onPress={() => toggleDropdown(item)}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.dropdownContent}>
              <FlatList
                data={practiceCollection}
                renderItem={({item, index}) => (
                  <View style={styles.dropdownItem} key={index}>
                    <Text style={styles.dropdownText}>{item.eText}</Text>
                    <Image
                      source={{uri: `${global.url}/lernspace${item.picPath}`}}
                      style={styles.image}
                    />
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
    );
  };
  const [arr, setArray] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Predefined Practices</Text>
      {practice.length > 0 ? (
        <FlatList
          data={practice}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.placeholderText}>No practices available</Text>
      )}
      <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            const arr = handleButtonClick();
            navigation.navigate('AddAppointment', {
              sending: route.params.sending,
              receivingP: arr,
              receivingT: route.params.receivingT,
            });
          }}>
          <Text style={styles.addButtonText}>Assign</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            console.log(route.params);
            navigation.navigate('AddPractice', {uid: route.params.sending.uid});
          }}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  list: {
    flexGrow: 1,
  },
  itemContainer: {
    marginBottom: 10,
    width: '85%',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  dropdownContent: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  dropdownItem: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 8,
  },
  addButton: {
    padding: 15,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    marginRight: 14,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
});

export default PreDefinePractices;
