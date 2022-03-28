import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Pressable, FlatList, SectionList } from 'react-native'
import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../redux/actions/auth';
import * as cartActions from '../../redux/actions/shop';
import { useNavigation } from '@react-navigation/native';
import Infos from '../../Components/Infos/Infos';
import ModeLivraison from '../../Components/ModeLivraison';
import ModePaiement from '../../Components/ModePaiement';
import Order from '../../Components/Order/Order';
import { getAdresse, getProblems, getProduct, getUser } from '../../api/services';
import ProductCard from '../../Components/ProductCard';
const ConfirmScreen = ({products,cart,actions,item,token,user, totalPrice}) => {
  const navigation = useNavigation();
  const [totalItems, setTotalItems] = useState(0);
  const [infos, setInfos] = useState([]);
function hello(){
  return(
    <>
    <ModeLivraison />
 <ModePaiement />
 <Order />
    </>
  )
}
  function myuser(){
      getUser(token).then((data)=>{
          setInfos(data)
           console.warn(data.infos)
      })
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
    return myuser()
   },[cart, totalItems, totalPrice, setTotalItems, actions.setTotalPrice])
  return (
    <SafeAreaView style={styles.container}>  
     <FlatList 
          data={infos.infos}
          keyExtractor={(item)=>item.id}
          renderItem={
            ({item})=>
               <Infos infos={item} />
           }
           ListFooterComponent={
            
              <>
              <ModeLivraison />
           <ModePaiement />
           <Order />
              </>
            
           }
          />     
             
      <View style={{backgroundColor:'white', height:80, marginVertical:5,}}>
          <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
             <Text style={{fontSize:20}}>
               Total {totalPrice} DH
             </Text>
             <Pressable onPress={()=>navigation.navigate('Adresse')} style={{backgroundColor: '#0592cd',borderRadius: 10, marginLeft:20}}>
                    <Text  style={{color:'white', fontSize:20, padding:10, }}>
                       Valider
                    </Text>
             </Pressable>
          </View>
      </View>
    </SafeAreaView>
  )
}
const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.username,
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
export default connect(mapStateToProps,mapDispatchToProps)(ConfirmScreen)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#EEEDE7',
    }
})