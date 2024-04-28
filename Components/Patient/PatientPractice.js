import { Alert, Button, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const PatientPractice = () => {
  const fetchData = async () => {
    // Add your logic to fetch data here
  }

  return (
    <View>
      <Text>PatientPractice</Text>
      <Button title='Click Me' onPress={fetchData} />
    </View>
  )
}

export default PatientPractice

const styles = StyleSheet.create({})
