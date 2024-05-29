import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const PreDefineTest = ({route, navigation}) => {
  const [tests, setTests] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [testCollection, setTestCollection] = useState([]);

  const [checkedItems, setCheckedItems] = useState({});
  const [selectedTestIds, setSelectedTestIds] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const url = `${global.url}/LernSpace/api/Test/getTests?Uid=${route.params.uid}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     if (data === 'data not found') {
  //       setTests([]);
  //     } else {
  //       setTests(data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const url = `${global.url}/LernSpace/api/test/gettests?Uid=${route.params.sending.uid}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data === 'data not fornd') {
        setTests([]);
      } else {
        setTests(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route.params]);

  const toggleDropdown = async item => {
    const url = `${global.url}/LernSpace/api/test/gettestDetail?pid=${item.id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTestCollection(data);
    } catch (error) {
      console.log(error);
    }
    setExpandedItem(expandedItem === item ? null : item);
  };

  const handleValueChange = id => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleButtonClick = () => {
    const checkedArray = Object.keys(checkedItems)
      .filter(key => checkedItems[key])
      .map(key => tests.find(item => item.id === parseInt(key)).id);
  
    const formattedArray = checkedArray.map(id => ({ testId: id }));
   // setSelectedTestIds(formattedArray);
    return formattedArray;
  };
  

  const renderItem = ({item, index}) => {
    const colors = ['#FFD700', '#87CEEB', '#98FB98', '#FFB6C1', '#FFA07A'];
    const backgroundColor = colors[index % colors.length];
    const isExpanded = expandedItem === item;

    return (
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <CheckBox
          value={!!checkedItems[item.id]}
          onValueChange={() => handleValueChange(item.id)}
          style={styles.checkbox}
          tintColors={{true: 'black', false: 'black'}}
        />
        <View style={[styles.itemContainer, {backgroundColor}]} key={item.id}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => toggleDropdown(item)}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
          {isExpanded && (
            <View style={styles.dropdownContent}>
              <FlatList
                data={testCollection}
                renderItem={({item}) => (
                  <View style={styles.dropdownItem} key={item.id}>
                    <Text style={styles.dropdownText}>
                      {item.questionTitle}
                    </Text>
                    <View style={styles.imageContainer}>
                      {item.Op1ImagePath && (
                        <Image
                          source={{
                            uri: `${global.url}/lernspace${item.Op1ImagePath}`,
                          }}
                          style={styles.image}
                        />
                      )}
                      {item.Op2ImagePath && (
                        <Image
                          source={{
                            uri: `${global.url}/lernspace${item.Op2ImagePath}`,
                          }}
                          style={styles.image}
                        />
                      )}
                      {item.Op3ImagePath && (
                        <Image
                          source={{
                            uri: `${global.url}/lernspace${item.Op3ImagePath}`,
                          }}
                          style={styles.image}
                        />
                      )}
                      {item.picPath && (
                        <Image
                          source={{
                            uri: `${global.url}/lernspace${item.picPath}`,
                          }}
                          style={styles.image}
                        />
                      )}
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Predefined Tests</Text>
      {tests.length > 0 ? (
        <FlatList
          data={tests}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.placeholderText}>No tests available</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            const arr = handleButtonClick();
            console.log(arr)
            navigation.navigate('AddAppointment', {
              sending: route.params.sending,
              receivingP: route.params.receivingP,
              receivingT:arr
            });;
          }}>
          <Text style={styles.addButtonText}>Assign</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addButton, {marginLeft: 10}]}
          onPress={() => {
            navigation.navigate('AddTest', {uid: route.params.uid});
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
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownContent: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  dropdownItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 100,
    width: 80,
    borderRadius: 8,
  },

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});

export default PreDefineTest;
