import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Card from '../Card'
const {width} = Dimensions.get('window')


const SmallCard = ({item}) => {
    
    return (
        <Card item={item}  style={styles.container} imageStyle={styles.image} />
    )
}

export default SmallCard

const styles = StyleSheet.create({
    container:{
        flex:1,
        width : width/2,
        margin: 10,
        height: 200
    },
    image:{
        flex:1,
        height: 219,
        width: '100%'
    }
})
