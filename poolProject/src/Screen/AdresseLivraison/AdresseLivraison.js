import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, useWindowDimensions, ActivityIndicator, Image} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import {useForm} from 'react-hook-form';
import { useNavigation } from '@react-navigation/core';
import instance from '../../api'
import * as Device from 'expo-device';
import Logo from '../../../assets/imgs/logo.png'
import * as SecureStore from 'expo-secure-store';
import * as authActions from '../../redux/actions/auth';
import * as cartActions from '../../redux/actions/shop';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModePaiement from '../../Components/ModePaiement';
import VerticalList from '../../Components/VerticalList';
import HorizontalList from '../../Components/HorizontalList/HorizontalList';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const AdresseLivraison = ({loading, actions,token,cart}) => {
  const {height} = useWindowDimensions(); 
  const navigation = useNavigation();
  const {control, handleSubmit, watch, resetField, reset} = useForm();
  const pwd = watch('password');
  const [user , setUser] = useState();
 


    useEffect(()=>{
      // console.warn(cart)
    },[])
  const onConservePress = (info) => {
    // actions.loading(true);
    // instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // instance.get('/api/user').then((res)=>{
    //                     setUser(res.data.user.id)
    //                 }).catch((err)=>{
    //                     console.error(err)
    //                           })
    //                           console.warn(user)
    // instance.post('/api/infos',{
    //     user_id:user,
    //     full_name:info.full_name,
    //     telefon:info.telefon,
    //     email:info.email,
    //     city:info.city,
    //     adresse:info.adresse
    // }).then((res)=>{
    //     if(res.data.success == true){
    //         navigation.navigate('Confirmation');
    //     }
    // }).catch((err)=>{
    //   console.error(err)
    // })


    navigation.navigate('Confirmation');
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loading ?<View style={[styles.container, styles.horizontal]}>
       <ActivityIndicator size={50} color='green' />
       </View>
        :
      <View style={styles.root}>
        <Text style={styles.title}>Adresse de la livraison</Text>
        <CustomInput
          name="full_name"
          control={control}
          placeholder="Nom & prénom (facultatif)"

        />
        <CustomInput
          name="telefon"
          control={control}
          placeholder="Numéro de téléphone *"
          rules={{
            required: 'Téléphone requis',
           
          }}
        />
        <CustomInput
          name="adresse"
          control={control}
          placeholder="Adresse de la livraison"
          rules={{
            required: 'Adresse requis',
            minLength: {
              value: 3,
              message: 'Votre Adresse doit comporter au moins 3 caractères',
            },
            maxLength: {
              value: 24,
              message: 'Adresse should be max 24 characters long',
            },
          }}
        />              
        <CustomButton
          text="Valider"
          onPress={handleSubmit(onConservePress)}
          type="TERTIARY"
        />
        {/* <CustomButton
          text="Conserver"
          onPress={onConservePress}
          type="TERTIARY"
        /> */}
      </View>}
    </ScrollView>
  );
};
//state_manager
const mapStateToProps = state => ({
  token: state.auth.token,
  username : state.auth.username,
  loading : state.auth.loading,
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

const styles = StyleSheet.create({
  root: {
    flex:1,
    alignItems: 'center',
    padding: 5,
  },
  title: {
    fontSize: 24,
    marginBottom:50,
    fontWeight: 'bold',
    color: '#1c6c44',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#1c6c44',
  },
  container: {
    flex: 1,
    justifyContent: "center",

  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 200
  },
  logo: {
    marginTop: '1%',
    width: '70%',
    maxWidth: 300,
    maxHeight: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdresseLivraison);
