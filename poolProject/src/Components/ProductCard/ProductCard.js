import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Dimensions, Button, Touchable } from 'react-native'
const {width, height} = Dimensions.get('window')
import { MaterialIcons } from '@expo/vector-icons';
import { imageUrl } from '../../api/imageUrl';
const ProductCard = ({style, imageStyle, item, onAdded,buyNow}) => {

   const navigation = useNavigation();

    const{id,category_id,title_product,description_product,marque,poid, price,image_product, qty} = item

    const details = (id)=>{
        navigation.navigate('productDetails', {
            productId: id,
            otherParam: 'anything you want here',
          });   
        // console.warn(id)
    }
   
    return (
       
        <View style={[styles.container, style]}>    
            <TouchableOpacity onPress={() => details(id)}>
                <Image  source={{uri:`${imageUrl}/${item.image_product}`}} style={[styles.image, imageStyle]} />
                        <View style={styles.contentContainer}>
                        <Text style={styles.title}>{item.title_product}</Text>
                        <Text style={styles.price}>{item.price} DH</Text>
                        <Text style={styles.poid}>{item.poid}</Text>
                        {/* <Text style={styles.brand}>{brand}</Text>            */}
                        </View>
                </TouchableOpacity> 
         <Pressable  onPress={()=>onAdded(item.id)} style={{flexDirection:'row',paddingHorizontal:10, marginVertical:5 }}>
                <MaterialIcons name="add-shopping-cart" 
                style={{flex:1, textAlign:'center',backgroundColor:'#FDD017',borderRadius:10, paddingVertical:10}} 
                size={24} color="black" /> 
        </Pressable>  
         <Pressable   onPress={()=>buyNow(item.id)} style={{flexDirection:'row',paddingHorizontal:10, marginTop:15 }}>
          <Text style={{flex:1, color:'white', textAlign:'center',fontSize:16,backgroundColor:'#0D78AA',borderRadius:10, paddingVertical:10}} >
              Achetez
          </Text>
      </Pressable>  
         
    
        </View>
    )
}
export default ProductCard;
const styles = StyleSheet.create({
    container :{
        width: width/2,
        height : 340,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',  
        margin: 5    
    },
    image: {
        width: 90,
        height:90,
        alignSelf:'center'
    },
    contentContainer: {
        padding: 1
    },
    title:{
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
        height:40
    },
    price :{
        textAlign: 'left',
        marginHorizontal: 20,
        fontSize: 15, 
    },
    poid:{
        textAlign: 'left',
        marginHorizontal: 20,
        fontSize: 15,
    },
    brand:{
        textAlign: 'right',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 12,
    }

})

