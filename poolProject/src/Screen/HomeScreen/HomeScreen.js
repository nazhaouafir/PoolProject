import { ScrollView ,StyleSheet, BackHandler,Alert, Text, View, StatusBar, ScrollViewBase, ScrollViewComponent } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProblemsList from '../Problems/ProblemsList';
import ProductList from '../../Components/ProductList';
import * as SecureStore from 'expo-secure-store';
import instance from '../../api';
import TabNavigation from '../../Navigation/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
const HomeScreen = () => {
  
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);
  return (
  
     
       <TabNavigation />        
   
             
      
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
