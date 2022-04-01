import { StyleSheet,BackHandler, Alert} from 'react-native';
import React,{useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import configureStore from './src/redux/store/configureStore';
import AppStack from './src/Navigation/AppStack';
import * as SecureStore from 'expo-secure-store';
const store = configureStore();

const App = () => { 
  return (
    <Provider store={store}>
<NavigationContainer>
  <AppStack />
</NavigationContainer>
    </Provider>

  );
};

export default App;

const styles = StyleSheet.create({
  
});
