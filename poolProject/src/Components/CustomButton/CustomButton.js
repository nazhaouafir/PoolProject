import React from 'react';
import {View, Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor, isLoading}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={[
        styles.container,
        styles[`container_${type}`],
        isLoading ? {backgroundColor: 'gray', opacity:0.5}: {}, 
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <View >           
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
         { isLoading ?  <ActivityIndicator size="small" style={{flexDirection:'row', marginRight:10}} color="white" /> : ''}
        {text}
      </Text>
      </View>
     
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    padding: 15,
    marginVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
  },

  container_PRIMARY: {
    backgroundColor: '#6ca33c',
  },

  container_SECONDARY: {
    borderColor: '#6ca33c',
    borderWidth: 2,
  },

  container_TERTIARY: {
    backgroundColor: '#25aae1'
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: '#fff',
    fontSize: 16,
  },
  text_PRIMARY: {
    color: '#fff',
    fontSize: 16,
  },
  

});

export default CustomButton;
