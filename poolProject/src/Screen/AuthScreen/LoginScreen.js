import { StyleSheet,Image, ToastAndroid, Text, View,useWindowDimensions, ScrollView, ActivityIndicator, Pressable} from 'react-native';
import React,{useState, useEffect} from 'react';

//Components
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';

//form
import {useForm, Controller} from 'react-hook-form';
//logo
import Logo from '../../../assets/imgs/logo.png'

//deviceName
import * as Device from 'expo-device';

//navigation
import {useNavigation} from '@react-navigation/native';

//secureStore
import * as SecureStore from 'expo-secure-store';

//axios
import instance from '../../api/'

//redux
import * as authActions from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//start 
const LoginScreen = ({actions,token,user, loading}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {height} = useWindowDimensions(); 
const navigation = useNavigation()

//mount_updtae
  useEffect(()=>{
   SecureStore.getItemAsync('token').then((token)=>{
          if(token){
              return navigation.navigate('Home')
          }
      }).catch((err)=>{
        console.error(err)
      })
 return true
  },[])
//functions
//login
const onSignInPressed =(data)=>{
     actions.loading(true)
    instance.post(`/api/login`,{
      deviceName: Device.modelName,
      email: data.email,
      password: data.password
    }).then((res)=>{
      actions.setUser(res.data.user)
      SecureStore.setItemAsync('token', res.data.token);
      SecureStore.getItemAsync('token').then((token)=> {
        if(token){
            actions.setToken(token)
            
             actions.loading(false)

             navigation.navigate('Home')   
        }else{
          actions.loading(false)
        }
      }).catch((err)=>{
        actions.loading(false)
        console.error(err)
      })
  }).catch((err)=>{
    console.error(err)
    actions.loading(false)
  })

  };

  //register
const onSignUpPress =()=>{
   navigation.navigate('register')
  }

 
  return (
   
    <ScrollView showsVerticalScrollIndicator={false}>
     { token || loading ? 
     <View style={[styles.container, styles.horizontal]}>
       <ActivityIndicator size={50} color='green' />
       </View>:
            <View style={styles.root}>
              {/* <Text>token : {token}</Text>
              <Text>{username}</Text> */}
            <Image
              source={Logo}
              style={[styles.logo, {height: height * 0.3}]}
              resizeMode="contain"
            />
              <CustomInput
                name="email"
                placeholder="E-mail"
                control={control}
                rules={{required: 'E-mail est requis'}}
              /> 
              <CustomInput
                name="password"
                placeholder="Mot de passe"
                secureTextEntry
                control={control}
                rules={{
                  required: 'Mot de passe requis',
                  minLength: {
                    value: 3,
                    message: 'Password should be minimum 3 characters long',
                  },
                }}
              />    
          <CustomButton text="SE CONNECTER" onPress={handleSubmit(onSignInPressed)} />
          
        
              <Pressable onPress={()=>onSignUpPress()}>
                <Text 
                style={{color:"#2b49a1ba", fontSize:16, fontWeight:'bold', marginVertical:10}}>
                  Vous avez pas un compte ? Créer Un
                </Text>
                </Pressable>    
          
      </View>
      }
    </ScrollView>
    
  );
};

//end

//state_manager 
const mapStateToProps = state => ({
  token: state.auth.token,
  user : state.auth.username,
  loading : state.auth.loading
});

const ActionCreators = Object.assign(
  {},
  authActions,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

//styles
const styles = StyleSheet.create({
   root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    marginTop: '20%',
    width: '70%',
    maxWidth: 300,
    maxHeight: 120,
  },

  container: {
    flex: 1,
    justifyContent: "center",

  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 300
  }

});
