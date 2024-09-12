import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import CheckBox from '@react-native-community/checkbox';

// Import the speaker image
import speakerImage from '../Images/speaker.png';

const PatientTest = ({route, navigation}) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const [testCollection, setTestCollection] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const fetchTests = async () => {
    const date = getCurrentDate();
    const url = `http://192.168.43.188/lernspace/api/Person/GetTwoPersonTest?uid=8`;
    const response = await fetch(url);
    const data = await response.json();
    // if (data && data.length > 0) {
    //   const allCollections = data.flatMap(item => item.Collections || []);
      setTestCollection(data);
      // Initialize selectedOptions array based on data length
    //   setSelectedOptions(
    //     allCollections.map(() => ({
    //       SelectedOptions: null,
    //       AppointmentId: null,
    //     })),
    //   );
   // }
  };

  useEffect(() => {
    fetchTests();
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
    if (currentIndex < testCollection.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = async () => {
    const result = selectedOptions.reduce(
      (acc, {SelectedOptions, AppointmentId}) => {
        const existing = acc.find(item => item.AppointmentId === AppointmentId);
        if (existing) {
          existing.SelectedOptions.push(SelectedOptions);
        } else {
          acc.push({
            SelectedOptions: [SelectedOptions],
            AppointmentId: AppointmentId,
            Pid: route.params.pid,
          });
        }
        return acc;
      },
      [],
    );

    // Sorting by AppointmentId if needed
    result.sort((a, b) => a.AppointmentId - b.AppointmentId);
    const url = `${global.url}/lernspace/api/Patient/TestComputation`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to save data. Please try again later.');
    }
  };

  const playSound = audioPath => {
    if (sound) {
      sound.stop();
      sound.release();
    }
    const newSound = new Sound(
      `${global.url}/lernspace${audioPath}`,
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        newSound.play();
        setSound(newSound);
      },
    );
  };

  const handleCheckBoxChange = (option, AppointmentId) => {
    setSelectedOptions(prevSelectedOptions => {
      const updatedSelectedOptions = [...prevSelectedOptions];

      // Toggle the current option's selection
      updatedSelectedOptions[currentIndex] = {
        SelectedOptions:
          option === selectedOptions[currentIndex]?.SelectedOptions
            ? null
            : option,
        AppointmentId: AppointmentId,
      };

      return updatedSelectedOptions;
    });
  };

  if (testCollection.length === 0 || currentIndex >= testCollection.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const currentItem = testCollection[currentIndex];
  const currentSelectedOption = selectedOptions[currentIndex]?.SelectedOptions;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Test</Text>
      <View style={styles.itemContainer}>
        <Text
          style={{
            color: 'black',
            fontSize: 26,
            fontWeight: '500',
            marginBottom: 18,
          }}>
          {currentItem && currentItem.Question}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View>
            <CheckBox
              value={currentSelectedOption === currentItem.CollectId}
              onValueChange={() =>
                handleCheckBoxChange(
                  currentItem.CollectId,
                  currentItem.AppointmentId,
                )
              }
              style={styles.checkbox}
              tintColors={{true: 'black', false: 'black'}}
            />
            <Image
              source={{uri: `${global.url}/lernspace${currentItem.Path}`}}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => playSound(currentItem.collectAudio)}>
              <Image source={speakerImage} style={styles.audioIcon} />
            </TouchableOpacity>
          </View>
          <View>
            <CheckBox
              value={currentSelectedOption === currentItem.Opt1}
              onValueChange={() =>
                handleCheckBoxChange(
                  currentItem.Opt1,
                  currentItem.AppointmentId,
                )
              }
              style={styles.checkbox}
              tintColors={{true: 'black', false: 'black'}}
            />
            <Image
              source={{
                uri: `${global.url}/lernspace${currentItem.Op1ImagePath}`,
              }}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => playSound(currentItem.Op1Audio)}>
              <Image source={speakerImage} style={styles.audioIcon} />
            </TouchableOpacity>
          </View>
          <View>
            <CheckBox
              value={currentSelectedOption === currentItem.Opt2}
              onValueChange={() =>
                handleCheckBoxChange(
                  currentItem.Opt2,
                  currentItem.AppointmentId,
                )
              }
              style={styles.checkbox}
              tintColors={{true: 'black', false: 'black'}}
            />
            <Image
              source={{
                uri: `${global.url}/lernspace${currentItem.Op2ImagePath}`,
              }}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => playSound(currentItem.Op2Audio)}>
              <Image source={speakerImage} style={styles.audioIcon} />
            </TouchableOpacity>
          </View>
          <View>
            <CheckBox
              value={currentSelectedOption === currentItem.Opt3}
              onValueChange={() =>
                handleCheckBoxChange(
                  currentItem.Opt3,
                  currentItem.AppointmentId,
                )
              }
              style={styles.checkbox}
              tintColors={{true: 'black', false: 'black'}}
            />
            <Image
              source={{
                uri: `${global.url}/lernspace${currentItem.Op3ImagePath}`,
              }}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => playSound(currentItem.Op3Audio)}>
              <Image source={speakerImage} style={styles.audioIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.button} onPress={handlePrevious}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}
          {currentIndex < testCollection.length - 1 ? (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinish}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default PatientTest;

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
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    width: '90%',
  },
  image: {
    height: 80,
    width: 80,
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
  checkbox: {
    marginRight: 10,
  },
});
