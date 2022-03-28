import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Card } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
const {width} = Dimensions.get('window')

const Infos = ({infos}) => {
    const {id,full_name, telefon, adresse} = infos
  return (
      <View style={styles.container}>
        <View style={{backgroundColor:'white', flex:0.8, height:120}}>
          {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
            {full_name}
          </Text>
          <Text style={styles.paragraph}>
            {telefon}
          </Text>
          <Text style={styles.paragraph}>
            {adresse}
          </Text>
        </View>
        <View style={{backgroundColor:'white', flex:0.2, height:120, justifyContent:'center',alignItems:'center'}}>
          <AntDesign name="right" size={16} color="black" />
        </View>
        
      </View>

  )
}

export default Infos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 1,
        backgroundColor: '#ecf0fa',
        width: width, 
        flexDirection:'row',
        marginVertical:5
      },
      paragraph: {
        margin: 5,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign:'left',
        color: '#34495e',
      },
})