import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../Components/CustomButton";
import { useNavigation } from '@react-navigation/core';
import image from '../../../assets/imgs/pool_bg.jpg'
import * as SecureStore from 'expo-secure-store';
import { useEffect } from "react";
import * as authActions from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import instance from "../../api";

const WelcomeScreen = ({token,actions}) => {
      useEffect(()=>{
          SecureStore.getItemAsync('token').then((mytoken)=>{
            if(mytoken)
            {actions.setToken(mytoken)}
            else{
              actions.setToken(null)
            }
          })
      })

  const navigation = useNavigation();
  const loginPressed = () => {
    navigation.navigate('Login');
  }
  const register = () => {
    navigation.navigate('register');
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Produits Piscine </Text>
        <Text style={styles.subText}>Je commande, je reçois</Text>
        {
          token? <View style={styles.buttonsContainer}>
        <CustomButton text="Commencer" type="PRIMARY" onPress={()=>navigation.navigate('Home')} />
      </View> :
        <View style={styles.buttonsContainer}>
          <CustomButton text="SE CONNECTER" type="PRIMARY" onPress={()=>loginPressed()} />
          {/* <CustomButton text="S'inscrire" type="TERTIARY" onPress={()=>register()} /> */}
        </View>
        }
      
      </ImageBackground>
    </View>
  );
};
//state_manager
const mapStateToProps = state => ({
  token: state.auth.token,
  username : state.auth.username,
  loading : state.auth.loading
});

const ActionCreators = Object.assign(
  {},
  authActions,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#25aae1ab"
  },
  buttonsContainer: {
    width: '100%',
    alignItems: "center",
    marginTop: 80,
  },
  subText:{
    color: "white",
    fontSize: 30,
    lineHeight: 60,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#2b49a1ba"
  }
});
