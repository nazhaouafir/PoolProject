import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import { imageUrl } from '../../api/imageUrl';

const Card = ({style, imageStyle, item, onPress}) => {
   const navigation = useNavigation();
   
    const {image_problem, problemName, description_problem, id} = item; 
     const hello = (id)=>{
    navigation.navigate('ProblemDetails', {
        problemId: id,
        otherParam: 'anything you want here',
      });
   }
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={()=>hello(id)} > 
            <Image source={{uri:`${imageUrl}/${image_problem}`}} style={[styles.image, imageStyle]} />
            <View style={styles.contentContainer}>
               <Text numberOfLines={3} ellipsizeMode='tail'>{problemName}</Text>
               <Text>{description_problem}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default Card;
const styles = StyleSheet.create({
    container :{
        width: '100%',
        height : 300,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',        
    },
    image: {
        width: '100%',
        height: 200     
    },
    contentContainer: {
        padding: 5
    }
})

