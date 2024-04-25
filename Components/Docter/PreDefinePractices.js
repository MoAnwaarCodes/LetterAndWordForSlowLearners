import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

const PreDefinePractices = ({route}) => {
  const [practice, setPractice] = useState([]);
  const [practiceCollection, setPracticeCollection] = useState();
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
  const [hello, setHello] = useState('');
  const renderItem = ({item, index}) => {
    const colors = ['#FFD700', '#87CEEB', '#98FB98', '#FFB6C1', '#FFA07A'];
    const backgroundColor = colors[index % colors.length];
    return (
      <>
        <TouchableOpacity
          style={[styles.itemContainer, {backgroundColor}]}
          onPress={() => onPressItem(item)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
       </>
    );
  };

  const onPressItem = async item => {
    // try {
    //   const response = await fetch(
    //     `${global.url}/LernSpace/api/Practice/getPracticeDetail?pid=${item.id}`,
    //   );
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const data = await response.json();
    //   setPracticeCollection(data);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  setHello("Hello")
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default PreDefinePractices;
