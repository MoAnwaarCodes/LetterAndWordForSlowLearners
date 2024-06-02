import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useEffect, useState } from 'react';

const PrePersonPractice = ({ route }) => {
  const [personData, setPersonData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  
  const fetchData = async () => {
    const url = `${global.url}/lernspace/api/Person/GetPersonTest?Uid=${route.params.uid}`;
    const response = await fetch(url);
    const data = await response.json();
    setPersonData(data);
  };
  
  useEffect(() => {
    fetchData();
  }, [route.params]);

  const handlePress = (index) => {
    setSelectedItem(index);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item,index }) => {
    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.1],
    });

    const animatedStyle = {
      transform: [{ scale }],
    };

    return (
      <TouchableOpacity
        style={[styles.card, selectedItem === index && styles.selectedCard]}
        onPress={() => handlePress(index)}>
        <Animated.View style={[styles.textContainer, selectedItem === index && animatedStyle]}>
          <Text style={styles.title}>{item.EText}</Text>
          <Text style={styles.name}>{item.QuestionTitle}</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${global.url}/lernspace${item.Op1ImagePath}` }}
              style={styles.image}
            />
            <Image
              source={{ uri: `${global.url}/lernspace${item.Op2ImagePath}` }}
              style={styles.image}
            />
            <Image
              source={{ uri: `${global.url}/lernspace${item.Op3ImagePath}` }}
              style={styles.image}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Pre Defined Test</Text>
      <FlatList
        data={personData}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
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
    color: '#4A90E2', // Blue font color
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
  selectedCard: {
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    marginBottom: 10,
    margin:8
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Dark font color
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    color: '#666', // Light font color
  },
});
