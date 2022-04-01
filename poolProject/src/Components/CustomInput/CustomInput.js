import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import { AppStyles } from '../../Styles/AppStyles';
const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  textType,
  label,
  editType,
  labelName='label'
}) => {
  function test(){
        console.warn('hello from test')
  }
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
         {label? <Text style={styles.label}>{labelName}</Text>: <></>}
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onKeyPress={editType}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              keyboardType={textType}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  input: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  label:{
    marginTop:10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom:5,
    alignSelf:'flex-start',
    color: 'gray',

  }
});

export default CustomInput;
