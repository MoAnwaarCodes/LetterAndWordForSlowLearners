import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const PreDefinePractices = ({route}) => {
  const [practice, setPractice] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [practiceCollection, setPracticeCollection] = useState([]);

  const fetchData = async () => {
    try {
      const url = `${global.url}/LernSpace/api/practice/getPractices?Uid=${route.params.uid}`;
      const response = await fetch(url);
      const data = await response.json();
      setPractice(data);
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
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor}]}
          onPress={() => toggleDropdown(item)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.dropdownContent}>
            <FlatList
              data={practiceCollection}
              renderItem={({item}) => (
                <View style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>{item.eText}</Text>
                  <Image
                    source={{uri: `${global.url}/lernspace${item.picPath}`}}
                    style={styles.image}
                  />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Predefined Practices</Text>
      <FlatList
        data={practice}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PreDefinePractices;
