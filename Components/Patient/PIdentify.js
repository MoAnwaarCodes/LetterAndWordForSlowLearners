import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Button,
  FlatList,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';

import {useState, useEffect} from 'react';
const PIdentify = () => {
  const [imageUris, setImageUris] = useState([]);
  const [result, setResult] = useState({});
  const [finalData, setFinalData] = useState({});
  const [image, setImage] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const imageHandler = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Image selection cancelled');
      } else {
        const uri = {
          name: response.assets[0].fileName,
          uri: response.assets[0].uri,
          type: response.assets[0].type,
        };
        setImageUris(prevUris => [...prevUris, uri]);
      }
    });
  };

  useEffect(() => {}, [imageUris]);
  const cameraHandler = () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 1,
    };

    launchCamera(options, response => {
      if (imageUris.length < 2) {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          Alert.alert('Cancelled', 'User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = {
            name: response.assets[0].fileName,
            uri: response.assets[0].uri,
            type: response.assets[0].type,
          };
          setImageUris(prevUris => [...prevUris, uri]);
          console.log('Image URI: ', imageUris);
        } else {
          console.log('Unknown error occurred');
          Alert.alert('Error', 'Unknown error occurred');
        }
      } else {
        Alert.alert('Already Selected 2 Pictures');
      }
    });
  };

  var count = 0;

  const imagePressHandler = async (image, index) => {
    if (index === 0) {
      const Data = new FormData();

      Data.append('name', 'p');
      Data.append('personPic', image);

      try {
        const response = await fetch(
          `http://192.168.43.188/lernspace/api/Person/Upload`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            body: Data,
          },
        );
        const data = await response.json();
        setName1(data.name);

        setResult(data);

        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    } else if (index === 1) {
      const Data = new FormData();

      Data.append('name', result.name);
      Data.append('personPic', image);

      try {
        const response = await fetch(
          `http://192.168.43.188/lernspace/api/Person/Upload`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            body: Data,
          },
        );
        const data = await response.json();

        setFinalData(data);
        setName2(data.person.name);
        console.log(finalData);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two Person Identification</Text>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {imageUris.map((uri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => imagePressHandler(uri, index)}>
            <Image source={{uri: uri.uri}} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <Button
        title="Click Me"
        onPress={() => {
          console.log(finalData);
        }}></Button> */}
      {/* <View style={{marginBottom: 80, alignSelf: 'flex-start', marginLeft: 30}}>
        <Text style={styles.text}>Name: </Text>
        <Text style={styles.text}>Age: </Text>
        <Text style={styles.text}>Gender: </Text>
      </View> */}
      <View style={{flexDirection:'row',marginBottom:12,}}>
        <Text style={{color: 'black',fontSize:20,fontWeight:600,marginRight:90}}>{name1}</Text>

        <Text style={{color: 'black',fontSize:20,fontWeight:600 ,marginLeft:40}}>{name2}</Text>
      </View>
      <FlatList
        data={finalData.Sentence}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <Text style={{color: 'black', fontSize: 15}}>
                Sentence : {item}
              </Text>
            </View>
          );
        }}></FlatList>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log();
        }}>
        <Text style={styles.buttonText}>Launch Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={imageHandler}>
        <Text style={styles.buttonText}>Launch Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PIdentify;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 24,
    margin: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
  },
  button: {
    marginBottom: 40,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  imageContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#007bff',
    margin: 5,
  },
});
