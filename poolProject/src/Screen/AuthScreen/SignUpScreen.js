import React, {useState} from 'react';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Message from '../../Components/Message';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/;
const SignUpScreen = ({loading, actions}) => {
  const {height} = useWindowDimensions(); 
  const navigation = useNavigation();
  const {control, handleSubmit, watch, resetField, reset} = useForm();
  const pwd = watch('password');
  const [error, setError] = useState({
    email:'',
    password:'',
    server:''
  })
    const onRegisterPressed = (data) => {
    actions.loading(true)
    instance.post('/api/register',{
      deviceName: Device.modelName,
      name : data.username,
      email: data.email.trim(),
      password: data.password
    }).then((res)=>{
      if(res.data.message){
        setError({
          email:res.data.message['unique:users'],
          password: res.data.message['password']
        })
      }
      SecureStore.setItemAsync('token', res.data.token);
      SecureStore.getItemAsync('token').then((token)=> {
        if(token){
            actions.setToken(token)
             actions.loading(false)
             reset(['username,email,password','password-repeat'])
             navigation.navigate('Home')
        }else{
          actions.loading(false)
        }
      }).catch((err)=>{
        actions.loading(false)
        console.error(err)
      })
     
  }).catch((err)=>{
    actions.loading(false)
    setError({server:err.message})
  })
  };


  const onSignInPress = () => {
   navigation.navigate('Login');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loading ?<View style={[styles.container, styles.horizontal]}>
       <ActivityIndicator size={50} color='green' />
       </View>
        :
      <View style={styles.root}>
         <Image
              source={Logo}
              style={[styles.logo, {height: height * 0.3}]}
              resizeMode="contain"
            />
        <Text style={styles.title}>Créer un compte</Text>
        {error.email || error.password?<Message errorText={error} type='WARNING' />:<></>}
        {error.server?<Message errorText={error} type='DANGER' />:<></>}
        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username requis',
            minLength: {
              value: 3,
              message: 'Le nom d\'utilisateur doit comporter au moins 3 caractères',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="E-mail"
          textType="email-address"
          rules={{
            required: 'E-mail requis',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Mot de passe"
          secureTextEntry
          rules={{
            required: 'Mot de passe requis',
            minLength: {
              value: 4,
              message: 'Le mot de passe doit comporter au moins 4 caractères',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Confirmer le Mot de passe"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'les deux mots de passe ne correspondent pas',
          }}
        />
        <CustomButton 
          text="Créer !"
          onPress={handleSubmit(onRegisterPressed)}
        />
        <Text style={styles.text}>
          
          En appuyant sur S’inscrire, vous acceptez nos{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
           modalités
          </Text>{' '}
          et{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
           conditions générales
          </Text>
        </Text>
        <Text style={{color:"#2b49a1ba", fontSize:16, fontWeight:'bold', marginVertical:5}}>
          Vous possédez déjà un compte ?
        </Text>
        <CustomButton
          text="CONNECTEZ-VOUS"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>}
    </ScrollView>
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

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 24,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
