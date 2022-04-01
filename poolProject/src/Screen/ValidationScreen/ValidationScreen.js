import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import check from '../../../assets/imgs/check_validation.png'

const ValidationScreen = () => {
    const {height} = useWindowDimensions(); 

  return (
    <View style={styles.root}>
        <Image
              source={check}
              style={[styles.logo, {height: height * 0.3}]}
              resizeMode="contain"
            />
      <Text>ValidationScreen</Text>
    </View>
  )
}

export default ValidationScreen

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
    
})