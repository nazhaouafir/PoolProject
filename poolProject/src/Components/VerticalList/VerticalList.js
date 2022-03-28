import { Dimensions,Animated, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import FlatCard from '../FlatCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles}from '../../Styles/cart'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as authActions from '../../redux/actions/auth';
import * as cartActions from '../../redux/actions/shop';
const { width, height } = Dimensions.get("screen");

const VerticalList = ({title,data,onRemove, actions}) => {
    
const increaseQuantity=(id, val)=>{
  let qty = val;
  qty++;
  actions.changeQuantity(id, qty);
}
const decreaseQuantity=(id, val)=>{
  let qty = val;
  qty--;
  if(qty>0){
    actions.changeQuantity(id, qty);
  }
}
  
    return (  


          <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={
          ({ item }) =>
           <FlatCard onRemove={onRemove} decreaseQuantity={decreaseQuantity}  onchangeQuantity={increaseQuantity}  item={item} />}
    />          
        
    );
};
const mapStateToProps = state => ({
    token: state.auth.token,
    username: state.auth.username,
    loading : state.auth.loading,
    products: state.shop.products,
    cart: state.shop.cart
  });
const ActionCreators = Object.assign(
    {},
    authActions,
    cartActions
  );
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
  });
export default connect(mapStateToProps,mapDispatchToProps)(VerticalList);
