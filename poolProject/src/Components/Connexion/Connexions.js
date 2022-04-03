import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'
import { useNavigation } from '@react-navigation/native'

const Connexions = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.buttonsContainer}>
        
        <CustomButton text="Se connecter" mystyle={{paddingVertical:20}} type="TERTIARY" onPress={()=>navigation.navigate('Login')} />
        <CustomButton text="Créer un nouveau compte" mystyle={{paddingVertical:20}} type="PRIMARY" onPress={()=>navigation.navigate('register')} />
     </View> 
  )
}

export default Connexions

const styles = StyleSheet.create({
    buttonsContainer: {
        // flex:1,
        width: '100%',
        alignItems: "center",
        marginTop: 230,
        justifyContent: 'center',
      },
})