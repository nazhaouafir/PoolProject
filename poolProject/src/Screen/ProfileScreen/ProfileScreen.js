import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import instance  from '../../api';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import * as authActions from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Entypo } from '@expo/vector-icons';
const ProfileScreen = ({loading,token,actions}) => {
    const [user , setUser] = useState();
    const [email , setEmail] = useState();
    const navigation = useNavigation()
    useEffect(()=>{      
        SecureStore.getItemAsync('token').then((mytoken)=>{
              if(mytoken)
              { 
                // console.warn(mytoken)
                actions.setToken(mytoken)}
          }).catch((err)=>{
            console.error(err)
          })
          if(token){
                  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    instance.get('/api/user').then((res)=>{
                        setUser(res.data.user.name)
                        setEmail(res.data.user.email)
                        // console.warn(res.data)
                    }).catch((err)=>{
                        console.error(err)
                              })
               }
  
})
    const onLogout= ()=>{
      if(token)
      {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        instance.post('/api/logout', token).then((res)=>{
          console.warn(res.data)
            SecureStore.deleteItemAsync('token').then(()=>{
              actions.setToken(null)
              actions.loading(false)
              navigation.navigate('Welcome')
            })
        }).catch((err)=>{
          console.error(err)
          actions.loading(false)

        })

      }
      else{
        actions.loading(false)
          Alert.alert('Vous êtes pas authentifié')
          }

     }

  return (
      <ScrollView>
          {!user ?<View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size={50} color='green' />
    </View> :
    <View style={styles.container}>
  
        <View style={styles.informationStyle}>
            <Text style={{fontSize: 20,textTransform:'uppercase',fontWeight: '200',color: '#105D8F',margin: 10,}}>Mon Compte</Text>
        </View>
        <View style={styles. logoutSection}>
                <Text style={styles.logout} >
                <AntDesign name="user"  size={24} color="" /> {user}
                </Text>
        </View>
        <View style={styles. logoutSection}>
                <Text style={styles.logout} >
                <Entypo name="email" size={24} color="" /> {email}
                </Text>
        </View>
        {/* <View style={styles.logoutSection}>
             <Text style={styles.logout} >
                <FontAwesome5 name="tools" size={20} color="#27427C" /> Modifier vos informations
                </Text>               
        </View> */}
        <View style={styles. logoutSection}>
                <Text style={styles.logout} >
                <Zocial name="cart" size={24} color="#27427C" /> Mes commandes
                </Text>
        </View>
        <View>
            <Pressable style={styles.logoutSection} onPress={()=>onLogout()}>                
                <Text style={styles.logout} >
                    <AntDesign name="poweroff"  size={24} color="#27427C" /> Deconnexion
                </Text>
            </Pressable>            
        </View>
      
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'white'
    },
    profileStyle:{
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      marginVertical: 20,
      borderColor: '#0592cd',
      borderWidth: 1,
      borderRadius: 80,
      width: 70,
      marginHorizontal: 150,
      alignContent: 'flex-start'
    },
    informationStyle:{
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      marginVertical: 5,
    },
    logoutSection:{
        backgroundColor: "white",
        paddingVertical: 14,
        borderTopColor: '#27427C',
        borderStyle: 'solid',
        borderTopWidth: 0.7,
        // justifyContent: 'flex-start',
    },
    logout:{        
        color:'#27427C',
        fontSize: 16,
        paddingBottom: 10,
        marginLeft:15
      },
      profileSection:{
          paddingHorizontal: 10,
          paddingVertical: 30,
          
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 300
      }
});
