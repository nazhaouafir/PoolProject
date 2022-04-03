import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
 const {width} = Dimensions.get('window')
    const {height} = Dimensions.get('window')
const Message = ({errorText={email:'email error',password:'password error',server:''},type='INFO'}) => {
   
  return (
    <View style={[styles.container, styles[`container_${type}`],]}>
      {errorText.email ?<Text style={styles[`message_${type}`]}>{errorText.email}</Text>:<></>}
     {errorText.password? <Text style={styles[`message_${type}`]}>{errorText.password}</Text>:<></>}
     {errorText.server? <Text style={styles[`message_${type}`]}>{errorText.server}</Text>:<></>}
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        width:width/1.2,
        alignItems:'center',
        height: height/10,
        paddingVertical:5,   
        marginVertical:10,
        borderRadius:10,
        
    },
    container_INFO:{
        backgroundColor:'#abc7fb'
    },
    container_DANGER:{
        backgroundColor:'#f87862'
    },
    container_WARNING:{
            backgroundColor:'#f9d983',
    },
    message_INFO:{
        fontSize:16,
        color:'white'
    },
    message_DANGER:{
        fontSize:16,
        color:'white'
    },
    message_WARNING:{
        fontSize:16,
        color:'gray'
    }
})