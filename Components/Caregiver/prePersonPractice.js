import { Button, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

const PrePersonPractice = ({ route }) => {
  const [personData, setPersonData] = useState([]);
  
  const fetchData = async () => {
    const url = `${global.url}/lernspace/api/Person/GetPersonpracticesWithDetail?Uid=${route.params.uid}`;
    const response = await fetch(url);
    const data = await response.json();
    setPersonData(data);
  };
  
  useEffect(() => {
    fetchData();
  }, [route.params]);

  const renderItem = ({ item,index }) => {
    return (
      <View style={styles.card} key={index}>
        <Image
          source={{ uri: `${global.url}/lernspace${item.picPath}` }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>PreDefined Practices</Text>
      <FlatList
        data={personData}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default PrePersonPractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    color: '#4A56E2',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    color: '#666',
  },
});
