import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const PreDefinePractices = ({route}) => {
  const [userData, setUData] = useState({});
  const [practice, setPractice] = useState([]);
  const fetchData = async () => {
   // const url = `${global.url}/LernSpace/api/practice/getPractices?Uid=${userData.uid}`;
   const url=`http://192.168.100.9/LernSpace/api/practice/getPractices?Uid=${userData.uid}` 
   const response = await fetch(url);
    const data1 = await response.json();
    setPractice(data1);
    console.log(practice);
  };
  useEffect(() => {
    setUData(route.params);
   

  }, [route.params]);
  return (
    <View>
      <Text style={{color: 'black', alignSelf: 'center', fontSize: 32}}>
        PreDefinePractices
      </Text>
<Button title='Click Me' onPress={()=>{
     fetchData();
}}></Button>
      <Text style={{color: 'black', alignSelf: 'center', fontSize: 32}}>
        {JSON.stringify(practice)}
      </Text>
    </View>
  );
};

export default PreDefinePractices;

const styles = StyleSheet.create({});
