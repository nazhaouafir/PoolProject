import { FlatList, SafeAreaViewBase, StyleSheet,ToastAndroid, Text, View, VirtualizedList } from 'react-native';
import React, { useEffect } from 'react';
import ProductCard from '../ProductCard';
import * as cartActions from '../../redux/actions/shop';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import instance from '../../api';
import { getProduct } from '../../api/services';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
const ProductList = ({title,produits,products,actions}) => {
  
  const navigation = useNavigation();
  const showToast = () => {
    ToastAndroid.show("Le produit ajouté au panier !", ToastAndroid.SHORT);
  };
  useEffect(()=>{
    getProduct().then((data)=>{
      actions.setProducts(data)
    }).catch((err)=>{
      console.error(err)
    })
  },[])

  function onAddedPress(id){
      actions.addItemToCart(id)
      showToast()
  }
  function buyNowPress(id){

    actions.addItemToCart(id)
      navigation.navigate('Cart');
  }
  return (
    <>
           <Text style={styles.textTitle}>{title}</Text>
          <FlatList 
           style={styles.listStyle}
          data={products ? products: produits}
          keyExtractor={(item)=>item.id.toString()}
          numColumns={2}
          // horizontal 
          // showsHorizontalScrollIndicator={false}
          renderItem={({item})=> <ProductCard item = {item} buyNow={buyNowPress} onAdded={onAddedPress} />}
          />
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

const styles = StyleSheet.create({
    listStyle:{
        marginVertical: 10,
        marginHorizontal: 10,
       flexDirection: "column"
    },
    textTitle:{
      textAlign: "center",
      fontSize: 16,
      paddingVertical: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase'
             
  }
});
