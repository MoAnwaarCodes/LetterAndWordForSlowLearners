import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';
import {addToCart} from '../redux/action';
import {useDispatch} from 'react-redux';
const Product = props => {
  const distaptch = useDispatch();
  const addToCartHandler = item => {
    distaptch(addToCart(item));
  };
  return (
    <View>
      <View key={props.index}>
        <Text style={{fontSize: 30}}>{props.item.name}</Text>
        <Text style={{fontSize: 20}}>{props.item.color}</Text>
        <Text style={{fontSize: 10}}>{props.item.price}</Text>
        <Button
          title="Add to Cart"
          onPress={() => {
            addToCartHandler(props.item);
          }}></Button>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});
