import React,{useEffect, useState} from 'react'
import {View, Text, StyleSheet, ScrollView, useWindowDimensions, ActivityIndicator, Image} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import {useForm} from 'react-hook-form';
import { useNavigation } from '@react-navigation/core';
import instance from '../../api'
import { getUser } from '../../api/services';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/actions/auth';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const UserScreen = ({token, actions}) => {
    const {control, handleSubmit, watch, resetField, reset, setValue} = useForm();
    const navigation = useNavigation();
    const [loading, setLoading] = useState()
    const [user_name, setUsername] = useState()
    const [email, setEmail] = useState()

    useEffect(()=>{
         getUser(token).then((user)=>{
              setValue('username', user.name, { shouldDirty: true })
                setValue('email', user.email, { shouldDirty: true })
        })
      

    },[])
    const onEditPresse = ()=>{
        
    }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    {loading ?<View style={[styles.container, styles.horizontal]}>
     <ActivityIndicator size={50} color='green' />
     </View>
      :
    <View style={styles.root}>
      <Text style={styles.title}>Modifier vos informations</Text>
      {/* <Text style={{textAlign:'left'}}>helov</Text> */}
      <CustomInput
        labelName="Utilisateur"
        label
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
        label
        labelName="Adresse email"
        control={control}
        placeholder="E-mail"
        textType="email-address"
        rules={{
          required: 'E-mail requis',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
      />
      <CustomButton 
        text="Enregistrer !"
        onPress={handleSubmit(onEditPresse)}
      />
    </View>}
  </ScrollView>
  )
}

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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserScreen)

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