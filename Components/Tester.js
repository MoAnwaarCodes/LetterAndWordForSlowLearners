import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';

const Tester = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [arr, setArray] = useState([]);

  const list = [
    {
      name: 'Anwar',
      id: 1,
    },
    {
      name: 'Azaan',
      id: 2,
    },
    {
      name: 'Sharoon',
      id: 3,
    },
  ];

  const handleValueChange = id => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleButtonClick = () => {
    const checkedArray = Object.keys(checkedItems)
      .filter(key => checkedItems[key])
      .map(key => list.find(item => item.id === parseInt(key)).id);
    setArray(checkedArray);
    console.log(checkedArray);
  };

  return (
    <View style={styles.container}>
      {list.map(item => (
        <View key={item.id} style={styles.checkboxContainer}>
          <CheckBox
            value={!!checkedItems[item.id]}
            onValueChange={() => handleValueChange(item.id)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{item.name}</Text>
        </View>
      ))}
      <Button title="Click Me" onPress={handleButtonClick} />
    </View>
  );
};

export default Tester;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 18,
  },
});
