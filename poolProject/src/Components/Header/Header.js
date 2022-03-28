import { Button,Modal, ImageBackground, Pressable, StyleSheet, Text, View, StatusBar } from 'react-native';
import React,{useEffect, useState} from 'react';
import pool_header from '../../../assets/imgs/pool_header.jpg'
import { Ionicons,AntDesign  } from '@expo/vector-icons'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Feather } from '@expo/vector-icons';
import * as authActions from '../../redux/actions/auth';
import * as SecureStore from 'expo-secure-store';
import instance  from '../../api';
import { useNavigation } from '@react-navigation/native';

const Header = ({title,token, username,actions,cart,products}) => {
  const navigation = useNavigation()
  const [cartCount, setCartCount]= useState(0)

  useEffect(()=>{
      let count =0;
      cart.forEach((item)=>{
        count += item.qty;
      });
      setCartCount(count);
    },[cart, cartCount])

  return (
    <View style={{flex:0,paddingTop:10,backgroundColor:"#61dafb"}}>
      <StatusBar animated={true}
        backgroundColor="#61dafb"/>
            <View style={{flexDirection:'row'}}>
                 <Pressable onPress={() => navigation.navigate('Cart')}  style={styles.button}>
                     <Text>{cartCount}</Text>
                     <Ionicons name="cart-outline" size={24} style={{textAlign:'center'}} color="black" />                    
                </Pressable>
            <Pressable style={styles.button_2}  
                   onPress={() => navigation.navigate('Profile')}>
                <Feather style={{textAlign: 'center'}} name="settings" size={24} color="black" />            
            </Pressable>
            </View>           
    </View>
       
  );
};
const mapStateToProps = state => ({
  token: state.auth.token,
  username: state.auth.username,
  loading : state.auth.loading,
  products: state.shop.products,
  cart : state.shop.cart
});
const ActionCreators = Object.assign(
  {},
  authActions,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});
export default  connect(mapStateToProps,mapDispatchToProps)(Header);

const styles = StyleSheet.create({
    titleHeader:{
        color: "white",
        fontSize: 30,
        lineHeight: 50,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#97ecf473",
    },
    button: {
        borderRadius: 20,
        padding: 5,
        height:40,
        backgroundColor: 'white',
        margin: 10,
        flex:1,
        flexDirection:'row',
        marginRight: 80,
      },
      button_2: {
        borderRadius: 20,
        padding: 5,
        height: 40,
        marginLeft: 170,
        backgroundColor: 'white',
        width:  60,
        margin: 10,
        flex:1
      },
      centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
        
      },
      modalView: {
        marginTop: 20,
        backgroundColor: "white",
        width:"100%",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button_mod: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 20,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "white",
      },
      buttonLogout:{
        backgroundColor: "white",
        color:'red',
        fontSize: 20
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});
