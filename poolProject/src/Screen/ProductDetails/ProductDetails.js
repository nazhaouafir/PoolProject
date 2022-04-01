import { StyleSheet, Text, View , Image, Pressable, Dimensions, ScrollView, ToastAndroid} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import ProductList from '../../Components/ProductList';
const {width,height} = Dimensions.get('window')
import { category, problemItem, productItem } from '../../api/services';
import { imageUrl } from '../../api/imageUrl';
import * as cartActions from '../../redux/actions/shop';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const ProductDetails = ({actions,route}) => { 
    
    const navigation = useNavigation();

    const showToast = () => {
        ToastAndroid.show("Le produit ajouté au panier !", ToastAndroid.SHORT);
      };

    const {productId, otherParam} = route.params;
    const[product, setProduct]= useState({
        image_product:'',
        title_product:'',
        description_product:'',
        marque:'',
        poid:'',
        price:'',
        caregory:'',
        problems:[]
    })
    function onAddedPress(id){
        actions.addItemToCart(id)
        showToast()
    }
    function buyNowPress(id){
  
      actions.addItemToCart(id)
        navigation.navigate('Cart');
    }

   function getProductItem(){
        productItem(productId).then(
            (item)=>{     
                setProduct({
                    image_product:item.image_product,
                    title_product:item.title_product,
                    description_product:item.description_product,
                    marque:item.marque,
                    poid:item.poid,
                    price:item.price,
                    caregory:item.category.categoryName,
                    problems:item.problems
                })
                    })
    }
    useEffect(()=>{
        return getProductItem()
    },[])
  return (
    <ScrollView> 
        <View style={styles.container}>
            <Image  resizeMode='cover' style={styles.image} source={{uri:`${imageUrl}/${product.image_product}`}} />
            <View style={styles.contentContainer}>
                <View style={{paddingHorizontal:10, paddingTop:20}}>
                    <Text style={styles.text} ><Text style={{fontWeight:'bold'}}>{product.title_product}</Text> </Text>
                    <Text style={styles.text} >Categorie : <Text style={{fontWeight:'bold'}}>{product.caregory}</Text> </Text>
                    <Text style={styles.text}>Prix : <Text style={{fontWeight:'bold'}}>{product.price?`${product.price} DH`:''} </Text></Text>
                    <Text style={styles.text}>Poid : <Text style={{fontWeight:'bold'}}>{product.poid}</Text> </Text>
                    <Text style={styles.text}>marque : <Text style={{fontWeight:'bold'}}>{product.marque} </Text></Text>
                </View>                
                <Pressable                
                    onPress={() => onAddedPress(productId)} 
                            style={{flexDirection:'row', width:width/1.2, alignContent:'center'}}
                            >
                    <MaterialIcons name="add-shopping-cart" 
                        style={{flex:1, textAlign:'center',
                        backgroundColor:'#FDD017',
                        padding:11,
                        borderRadius:15,
                        marginTop:5}} 
                        size={30} color="black" /> 
                </Pressable>
                <Pressable                
                    onPress={() => buyNowPress(productId)} 
                            style={{flexDirection:'row', width:width/1.2,borderRadius:12, alignContent:'center'}}>
                        <Text style={{flex:1, borderRadius:15,color:'white', textAlign:'center', padding:11,fontSize:20,backgroundColor:'#0D78AA',marginTop:5}} >
                            Achetez
                        </Text>
                </Pressable>
            </View>
        </View>
        <View style={styles.details}>
            <View style={styles.details_item}>
                <Text style={styles.title}>Description</Text>
                <Text>
                    {product.description_product}
                </Text>
            </View>
           
          
        </View>    
    </ScrollView>
  );
};
const ActionCreators = Object.assign(
    {},
    cartActions,
  );
  const mapStateToProps = state => ({
    token: state.auth.token,
    username: state.auth.username,
    loading : state.auth.loading,
    produits: state.shop.products,
  
  });
  const mapDispatchToProps = dispatch =>({
  
    actions: bindActionCreators(ActionCreators, dispatch)
  })
  export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

const styles = StyleSheet.create({
    container :{
        flex:1,
        padding:15,
        flexDirection: 'row-reverse',
        // alignItems: 'center',
        // justifyContent:'center',
        // alignContent:'center',
        alignSelf:'center',
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginBottom: 10,
        // marginHorizontal:5,
        height: 350,
        width: width/1.1,
        // elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    image: {
        flex: 0.35,
        height:100  
    },
    contentContainer: {
        flex: 0.80,
        
    },
    text:{
        fontSize: 15,
        paddingVertical:5,   
    },
    details_item:{
        marginVertical:10
    },
    title:{
        fontSize:18,
        fontWeight: '900',
        marginBottom:5
    },
    details:{
        margin:20,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: "#000",
        padding:15,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }

});
