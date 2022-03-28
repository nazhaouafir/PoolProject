import { Dimensions,Animated, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as authActions from '../../redux/actions/auth';
import * as cartActions from '../../redux/actions/shop';
const { width, height } = Dimensions.get("screen");
import SmallCard from '../SmallCard'
import FlatCard from '../FlatCard';
const HorizontalList = ({ title, data,onRemove, actions }) => {
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
        <View>
           <Text style={styles.textTitle}>{title}</Text>
                <View style={styles.listStyle}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <FlatCard onRemove={onRemove} decreaseQuantity={decreaseQuantity}  onchangeQuantity={increaseQuantity}  item={item} />}
                    />
                </View>
        </View>

    )
}
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
export default connect(mapStateToProps,mapDispatchToProps)(HorizontalList)

const styles = StyleSheet.create({
    listStyle:{
        marginVertical: 10,
        marginHorizontal: 10,
       flexDirection: "column"
    },
    textTitle:{
        textAlign: "center",
        fontSize: 20,
        paddingVertical: 10,
        fontWeight: 'bold'        
    }
})
