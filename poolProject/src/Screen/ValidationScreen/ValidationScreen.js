import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import check from '../../../assets/imgs/check_validation.jpg'
import pool from '../../../assets/imgs/pool.png'
import { useNavigation } from '@react-navigation/native';

const ValidationScreen = () => {
    const {height} = useWindowDimensions(); 
      const  navigation = useNavigation()
  return (
    <View style={styles.root}>
        <Image
              source={check}
              style={[styles.logo, {height: height * 0.3}]}
              resizeMode="contain"
            />
      <View style={{backgroundColor:'white', borderRadius:20, padding:10, marginTop:16}}>
      <Text style={styles.title}>Merci pour votre commande</Text>
      <Text style={styles.message}>Notre responsable de logistique va vous contact bientôt</Text>
      <Pressable style={styles.button} onPress={()=>navigation.navigate('Home')}>
          <Text style={styles.textButton}>Accueil</Text>
      </Pressable>
      </View>
        <Image
              source={pool}
              style={[styles.logo_2, {height: height * 0.3}]}
              resizeMode="contain"
            />
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
      logo_2:{
        width: '70%',
        maxWidth: 300,
        maxHeight: 120,
        
      },
    title:{
        fontSize: 20,
        marginVertical:15,
        textAlign:'center',
        color:'#0592cd'
      },
      message:{
        fontSize:18,
        marginVertical:20,
        alignSelf:'center',
        textAlign:'center',
        color:'#0592cd'
    },
    textButton:{
     color: '#EEEDE7',
     fontSize:20,
     textAlign:'center'
    },
    button:{
        padding:15,
        marginVertical:20,
        marginHorizontal:40,
        borderRadius:10,
        backgroundColor: '#0592cd',
        color: '#EEEDE7'
    }
})