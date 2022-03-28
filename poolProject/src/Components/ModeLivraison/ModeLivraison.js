import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const {width} = Dimensions.get('window')
import { CheckBox } from 'react-native-elements'

const ModeLivraison = () => {
  return (
    <View style={styles.container}>
        <View style={{backgroundColor:'white', flex:1, height:140}}>
          <Text style={styles.title}>
            Mode de livraison
          </Text>
          <CheckBox
                containerStyle={{backgroundColor:'white', borderColor:'white'}}
                textStyle={{fontWeight:'normal'}}
                title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente odit, omnis nesciunt
                        facilis ullam at molestiae nobis'
                checked={true}
            />
        </View>  
      </View>

  )
}

export default ModeLivraison

const styles = StyleSheet.create({
    container: {
        flex: 2,
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