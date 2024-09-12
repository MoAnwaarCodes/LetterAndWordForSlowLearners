import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
const Header = () => {
  const data = useSelector((state) => state.reducer)
  console.warn(data)
  return (
    <View>
      <Text>Header</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})