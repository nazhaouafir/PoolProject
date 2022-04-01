import React,{useEffect, useState} from 'react'
import {View, Text, StyleSheet, ScrollView, useWindowDimensions, ActivityIndicator, Image} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import {useForm} from 'react-hook-form';
import { useNavigation } from '@react-navigation/core';
import instance from '../../api'
import { editUser, getUser, sendCommande } from '../../api/services';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/actions/auth';
import * as cartActions from '../../redux/actions/shop';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const UserScreen = ({token,route,loading,cart, actions}) => {
  const {type} = route.params;
    const {control, handleSubmit, watch, resetField, reset, setValue} = useForm();
    const navigation = useNavigation();
    // const [loading, setLoading] = useState()
    const [user_name, setUsername] = useState()
    const [email, setEmail] = useState()
    const [mytype, setMyType] = useState(type)

    useEffect(()=>{
       actions.loading(true)
         getUser(token).then((user)=>{
               
              setValue('username', user.name, { shouldDirty: true })
              setValue('email', user.email, { shouldDirty: true })
              setValue('adresse', user.adresse, { shouldDirty: true })
              setValue('telefon', user.telefon, { shouldDirty: true })
              actions.loading(false)
        })
    },[])
    const onEditPresse = (info)=>{
      actions.loading(true)
        editUser(token,info).then(
          (res)=>{
            if(res.status==true){

              getUser(token).then((user)=>{
                setValue('username', user.name, { shouldDirty: true })
                setValue('email', user.email, { shouldDirty: true })
                setValue('adresse', user.adresse, { shouldDirty: true })
                setValue('telefon', user.telefon, { shouldDirty: true })
                                    })
                actions.loading(false)

              setMyType('cmd')
            }else{
              actions.loading(false)
              console.warn(res.message)
            }
                }).catch((err)=>{
                  actions.loading(false)
            console.error(err)
          })
    }
    const onChangePresse = ()=>{
        setMyType('edit')
    }
    const onSendPress=()=>{
      actions.loading(true)
      
      sendCommande(token,cart).then((res)=>{
        if(res.data.success==true){
          actions.viderCart(cart) 
          actions.loading(false)
          navigation.navigate('Validation')   
        }         
      }).catch((err)=>{
        actions.loading(false)
        console.error(err)
      })

  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    {loading ?<View style={[styles.container, styles.horizontal]}>
     <ActivityIndicator size={50} color='green' />
     </View>
      :
    <View style={styles.root}>
      <Text style={styles.title}>{mytype=='cmd' ? 'Adresse de la Livraison':'Modifier vos informations'}</Text>
      {/* <Text style={{textAlign:'left'}}>helov</Text> */}
      <CustomInput
        labelName="Nom & Prénom *"
        label
        editType={onChangePresse}
        name="username"
        control={control}
        placeholder=""
        rules={{
          required: 'Nom et prénom requis',
          minLength: {
            value: 3,
            message: 'Le nom doit comporter au moins 3 caractères',
          },
          maxLength: {
            value: 34,
            message: 'Username should be max 24 characters long',
          },
        }}
      />
      <CustomInput
        name="email"
        label
        editType={onChangePresse}
        labelName="Adresse email *"
        control={control}
        placeholder="E-mail"
        textType="email-address"
        rules={{
          required: 'E-mail requis',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
      />
      <CustomInput
       labelName="Numéro de téléphone *"
       label
       editType={onChangePresse}
          name="telefon"
          control={control}
          placeholder=""
          rules={{
            required: 'Téléphone requis',
           
          }}
        />
        <CustomInput
         labelName="Adresse de la livraison *"
         label
         editType={onChangePresse}
          name="adresse"
          control={control}
          placeholder=""
          rules={{
            required: 'Adresse requis',
            minLength: {
              value: 3,
              message: 'Votre Adresse doit comporter au moins 3 caractères',
            },
            maxLength: {
              value: 114,
              message: 'Adresse should be max 24 characters long',
            },
          }}
        /> 
     {mytype=='edit'||type=='edit'? <CustomButton 
        text="Enregistrer les modifications!"
        onPress={handleSubmit(onEditPresse)}
      />:<></>
        }
        { mytype=='cmd'&& type=='cmd'?
      <CustomButton 
      isLoading={cart.length==0}
      type="TERTIARY"
      text="Valider!"
        onPress={handleSubmit(onSendPress)}
      /> :<></>
      }
    </View>}
  </ScrollView>
  )
}

//state_manager 
const mapStateToProps = state => ({
    token: state.auth.token,
    user : state.auth.username,
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