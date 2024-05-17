import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from 'react-native';

const PreDefinetests = ({route, navigation}) => {
  const [test, setTest] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [testCollection, setTestCollection] = useState([]);

  const fetchData = async () => {
    try {
      const url = `${global.url}/LernSpace/api/test/gettests?Uid=${route.params.uid}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data === 'data not fornd') {
        setTest([]);
      } else {
        setTest(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route.params]);

  const toggleDropdown = async item => {
    console.log(item);
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

  const renderItem = ({item, index}) => {
    const colors = ['#FFD700', '#87CEEB', '#98FB98', '#FFB6C1', '#FFA07A'];
    const backgroundColor = colors[index % colors.length];
    const isExpanded = expandedItem === item;

    return (
      <View style={[styles.itemContainer, {backgroundColor}] } key={index}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => toggleDropdown(item)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.dropdownContent}>
            <FlatList
              data={testCollection}
              renderItem={({item,index}) => (
                <View style={styles.dropdownItem} key={index}>
                  <Text style={styles.dropdownText}>{item.questionTitle}</Text>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{
                        uri: `${global.url}/lernspace${item.Op1ImagePath}`,
                      }}
                      style={styles.image}
                    />

                    <Image
                      source={{
                        uri: `${global.url}/lernspace${item.Op2ImagePath}`,
                      }}
                      style={styles.image}
                    />
                    <Image
                      source={{
                        uri: `${global.url}/lernspace${item.Op3ImagePath}`,
                      }}
                      style={styles.image}
                    />
                    <Image
                      source={{
                        uri: `${global.url}/lernspace${item.picPath}`,
                      }}
                      style={styles.image}
                    />
                  </View>
                </View>
              )}
            //  keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Predefined tests</Text>
      {test.length > 0 ? (
        <FlatList
          data={test}
          renderItem={renderItem}
         // keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.placeholderText}>No Test Available</Text>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddTest', {uid: route.params.uid});
        }}>
        <Text style={styles.addButtonText}>Add New Test</Text>
      </TouchableOpacity>
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

export default PreDefinetests;
