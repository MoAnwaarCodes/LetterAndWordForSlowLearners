import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Sound from 'react-native-sound';

// Import the speaker image
import speakerImage from '../Images/speaker.png';

const PatientPractice = ({ route, navigation }) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const [practiceCollection, setPracticeCollection] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sound, setSound] = useState(null);

  const fetchPractices = async () => {
    const date = getCurrentDate();
    const url = `${global.url}/lernspace/api/Patient/AssignedPractic?Pid=${route.params.pid}&filter=${date}`;
    const response = await fetch(url);
    const data = await response.json();
    setPracticeCollection(data.Collections);
  };

  useEffect(() => {
    fetchPractices();
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < practiceCollection.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = () => {
    navigation.goBack();
    console.log('clicked');
  };

  const playSound = (audioPath) => {
    if (sound) {
      sound.stop();
      sound.release();
    }
    const newSound = new Sound(`${global.url}/lernspace${audioPath}`, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      newSound.play();
      setSound(newSound);
    });
  };

  if (practiceCollection.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const currentItem = practiceCollection[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Practice</Text>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: `${global.url}/lernspace${currentItem.Path}` }}
          style={styles.image}
        />
        <Text style={styles.defaultText}>{currentItem.Etext}</Text>
        
        <TouchableOpacity style={styles.audioButton} onPress={() => playSound(currentItem.audioPath)}>
          <Image source={speakerImage} style={styles.audioIcon} />
        </TouchableOpacity>
        
        <View style={styles.buttonContainer}>
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.button} onPress={handlePrevious}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}

          {currentIndex < practiceCollection.length - 1 ? (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinish}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default PatientPractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3e5f5', // Light purple background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a1b9a', // Dark purple color
    marginBottom: 20,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    width: '90%',
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  defaultText: {
    fontSize: 20,
    color: '#6a1b9a',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  finishButton: {
    backgroundColor: '#d32f2f', // Red color for finish button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  audioButton: {
    backgroundColor: '#6a1b9a',
    padding: 12,
    borderRadius: 50,
    marginBottom: 20,
  },
  audioIcon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
