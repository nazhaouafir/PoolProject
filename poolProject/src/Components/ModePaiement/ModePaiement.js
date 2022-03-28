import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const {width} = Dimensions.get('window')
import { CheckBox } from 'react-native-elements'

const ModePaiement = () => {
  return (
    <View style={styles.container}>
        <View style={{backgroundColor:'white', flex:1, height:140}}>
          <Text style={styles.title}>
            Mode du Paiements
          </Text>
          <CheckBox
                containerStyle={{backgroundColor:'white', borderColor:'white'}}
                textStyle={{fontWeight:'normal', textTransform:'uppercase'}}
                title='Payer à la Livraison'
                checked={true}
            />
        </View>
        
        
      </View>

  )
}

export default ModePaiement

const styles = StyleSheet.create({
    container: {
        flex: 3,
        
        paddingTop: 1,
        backgroundColor: '#ecf0fa',
        width: width, 
        flexDirection:'row',
        marginVertical:5
      },
      title: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'left',
        color: '#34495e',
      },
      paragraph: {
        margin: 5,
        fontSize: 12,
        fontWeight:'normal',
        textAlign:'left',
        color: '#34495e',
      },
})