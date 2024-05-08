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

const PreDefinetests = ({route,navigation}) => {
  const [test, settest] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [testCollection, settestCollection] = useState([]);

  const fetchData = async () => {
    try {
      const url = `${global.url}/LernSpace/api/test/gettests?Uid=${route.params.uid}`;
      const response = await fetch(url);
      const data = await response.json();
      settest(data);
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
     
      settestCollection(data);
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
              data={testCollection}
              renderItem={({item}) => (
                <View style={styles.dropdownItem}>
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
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Predefined tests</Text>
      <FlatList
        data={test}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <Button title='Add New Test' onPress={()=>{
        navigation.navigate('AddTest',{uid: route.params.uid})
      }}></Button>
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
  
});

export default PreDefinetests;
