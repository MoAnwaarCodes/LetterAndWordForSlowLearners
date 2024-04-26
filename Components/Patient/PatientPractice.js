import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PatientPractice = () => {
  const fetchData=async()=>{
    Alert.alert("Clicked")
  }
    return (
    <View>
      <Text>PatientPractice</Text>


      <Button title='Click Me' onPress={fetchData}></Button>
    </View>
  )
}

export default PatientPractice

const styles = StyleSheet.create({})