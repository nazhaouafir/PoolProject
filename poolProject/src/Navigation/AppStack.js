import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React,{useState, useEffect} from 'react';
import HomeScreen from '../Screen/HomeScreen';
import ProblemDetails from '../Screen/Problems/ProblemDetails';
import ProblemsList from '../Screen/Problems/ProblemsList';
import ProductScreen from '../Screen/ProductScreen';
import modalScreen from '../Screen/modalScreen';
import ProductDetails from '../Screen/ProductDetails';
import { createNativeStackNavigator,TransitionPresets } from '@react-navigation/native-stack';
import LoginScreen from '../Screen/AuthScreen/LoginScreen';
import SignUpScreen from '../Screen/AuthScreen/SignUpScreen';
import WelcomeScreen from '../Screen/WelcomeScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import Header from '../Components/Header';
import * as authActions from '../redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartScreen from '../Screen/CartScreen';
import UserScreen from '../Screen/UserScreen/UserScreen';
import ValidationScreen from '../Screen/ValidationScreen/ValidationScreen';
import * as SecureStore from 'expo-secure-store';
import { getUser } from '../api/services';

const Stack = createNativeStackNavigator();

const AppStack = ({actions,token}) => {
  useEffect(()=>{
    getUser(token).then((res)=>{
      if(!res){
        SecureStore.deleteItemAsync('token')
        actions.setToken(null)
      }
    })  
  },[])
  return (
    <Stack.Navigator>

        <Stack.Screen 
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown:false
             } }
                 />
        <Stack.Screen 
            name="Cart"
            component={CartScreen}
            options={{
              headerShown:true,
              title:'Panier'
             } } />

                 {/* **************** */}
        <Stack.Screen 
            name="Edit"
            component={UserScreen}
            options={{
              headerShown:true,
              title: 'Informations'

             } }/>
        <Stack.Screen 
            name="Validation"
            component={ValidationScreen}
             options={({ navigation, route }) => ({
          // headerTitle: (props) => <Header {...props} />,
          header: ()=><Header />,
          headerTransparent:true,
        })}/>
        <Stack.Screen 
            name="Profile"
            component={ProfileScreen}
            option={{
            }} />
      {/* ********** */}

        <Stack.Screen 
                name="register"
                component={SignUpScreen}
                option={{
                title: 'register',
                    
                }} />
        <Stack.Screen 
        name="Login"
        component={LoginScreen}
        option={{}} />
        <Stack.Screen 
        name="Products"
        component={ProductScreen}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Header {...props} />,
          header: ()=><Header />,
          headerTransparent:true,
        })} />
    <Stack.Screen 
        name="productDetails"
        component={ProductDetails}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Header {...props} />,
          header: ()=><Header />,
          headerTransparent:true,
        })}/>
         <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Header {...props} />,
          header: ()=><Header />,
          headerTransparent:true
        })} />

         <Stack.Screen 
        name="ProblemDetails"
        component={ProblemDetails}
          options={({ navigation, route }) => ({
          // headerTitle: (props) => <Header {...props} />,
          header: ()=><Header />,
          headerTransparent:true
        })}/>
          <Stack.Screen 
        name="ProblemsList"
        component={ProblemsList}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Header {...props} />,
          header: ()=><Header />,
          headerTransparent:true
        })}/>      
</Stack.Navigator>
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
export default connect(mapStateToProps, mapDispatchToProps)(AppStack);

const styles = StyleSheet.create({
 
});
