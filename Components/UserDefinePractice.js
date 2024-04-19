import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';

const UserDefinePractice = ({ route }) => {
  const fetchPractices = async () => {
    try {
      const response = await fetch(
        `${global.url}/lernspace/api/Practice/userDefindPractices?Uid=${data.uid}`
      );
      const data1 = await response.json();
      setPractice(data1);
      console.log(practice);
    } catch (error) {
      console.error(error);
    }
  };

  const [data, setData] = useState('');
  const [practice, setPractice] = useState({picPath:'/Media/Words/images/ball.jpeg'});

  useEffect(() => {
    setData(route.params);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Define Practice</Text>
      <Button onPress={fetchPractices} title="Refresh Practices" color="#007bff" />

      <FlatList
        data={practice}
        keyExtractor={(item, index) => index.toString()} // Ensure keys are unique
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.uText}</Text>
                <Text style={styles.subtitle}>{item.eText}</Text>
                <Text style={styles.info}>Type: {item.type}</Text>
                <Text style={styles.info}>Group: {item.C_group}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default UserDefinePractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666666',
  },
  info: {
    fontSize: 14,
    color: '#444444',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
