import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native'
import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../redux/actions/auth';
import * as cartActions from '../../redux/actions/shop';
import VerticalList from '../../Components/VerticalList';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAdresses } from '../../api/services';
 
const CartScreen = ({products,cart,actions,item,token, totalPrice}) => {
  const navigation = useNavigation();

  
  const [totalItems, setTotalItems] = useState(0);
  function finaliser(){
    // getAdresses(token).then((data)=>{
      
    //     navigation.navigate('Adresse')
    
    // console.warn(data)
    // })
    navigation.navigate('Adresse');
  }
  
  useEffect(()=>{ 
    let items = 0;
    let price = 0;
    cart.forEach(item =>{
      items += item.qty;
      price += item.qty * item.price
    })

    actions.setTotalPrice(price);
    setTotalItems(items);

  },[cart, totalItems, totalPrice, setTotalItems, actions.setTotalPrice])
  return (
    <SafeAreaView style={styles.container}>  
      {/* <Text>CartScreen</Text> */}
                {cart.length==0 ?
                 <View style={styles.container}>
                  <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                      <Text style={{marginVertical:15, fontSize:16, textTransform:'uppercase'}}>
                         Panier Vide
                      </Text>
                      <Pressable onPress={()=>navigation.navigate('Products')} style={[styles.buttonEnabled, {width:250, alignSelf:'center'}]}>
                        <Text style={{color:'white', fontSize:20, padding:10,textAlign:'center' }}>Choisissez vos produis</Text>
                      </Pressable>
                  </View>
                 </View>
                 : <VerticalList  onRemove={actions.removeItem}  data={cart} /> }
     

      <View style={{backgroundColor:'white', height:80, marginVertical:5,}}>
          <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
             <Text style={{fontSize:20}}>
                {totalPrice} DH
             </Text>
             <Pressable disabled={cart.length==0} onPress={()=>finaliser()}
             style={[cart.length==0? styles.buttonDisabled: styles.buttonEnabled]}>
                    <Text  style={{color:'white', fontSize:20, padding:10, }}>
                       Finaliser la commande
                    </Text>
             </Pressable>
          </View>
      </View>
    </SafeAreaView>
  )
}
const mapStateToProps = state => ({
    token: state.auth.token,
    username: state.auth.username,
    loading : state.auth.loading,
    products: state.shop.products,
    cart: state.shop.cart,
    totalPrice: state.shop.totalPrice
  });
  const ActionCreators = Object.assign(
    {},
    authActions,
    cartActions
  );
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
  });
export default connect(mapStateToProps,mapDispatchToProps)(CartScreen)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#EEEDE7',
    },
    buttonEnabled:{
      backgroundColor: '#0592cd',
      borderRadius: 10,
       marginLeft:20, 
    },
    buttonDisabled:{
      backgroundColor: 'gray',
      borderRadius: 10,
       marginLeft:20, 
    }
})