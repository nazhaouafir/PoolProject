import { StyleSheet,Text, View, Image, ScrollView, ToastAndroid,FlatList, Pressable, ActivityIndicator } from 'react-native';
import React,{Component, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { imageUrl } from '../../../api/imageUrl';
import { problemItem } from '../../../api/services';
import ProductCard from '../../../Components/ProductCard';
import * as cartActions from '../../../redux/actions/shop'
import * as authActions from '../../../redux/actions/auth'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProduct } from '../../../api/services';
const ProblemDetails =({actions,route, loading})=>{
    const [isLoading, setLoading] = useState()
    const [produits, setProduits] = useState()
    const [problem, setProblem] = useState({
        image_problem: '',
        problemName: '',
        description_problem:'',
        solution_problem:'',
        products:[]
    })
    const {problemId} = route.params;
    function onAddedPress(id){
        actions.addItemToCart(id)
        showToast()
    }
    function buyNowPress(id){
  
      actions.addItemToCart(id)
        navigation.navigate('Cart');
    }
    function getProblemItem(){
       actions.loading(true)
        problemItem(problemId)
        .then((item)=>{
            setProblem({
                image_problem:item.image_problem,
                problemName: item.problemName,
                description_problem: item.description_problem,
                solution_problem:item.solution_problem,
                products:item.products
            })
            actions.loading(false)
                    }).catch((err)=>{
            console.error(err)
            actions.loading(false)
        })
      }
      useEffect(()=>{
           return getProblemItem()
      },[])
      useEffect(()=>{
        getProduct().then((data)=>{
          actions.setProducts(data)
        }).catch((err)=>{
          console.error(err)
        })
      },[])
  
 
    const navigation = useNavigation();

  return (
      <ScrollView 
      showsVerticalScrollIndicator={false} >
       {loading ? <View style={{justifyContent:'center', marginVertical:100}}>
                <ActivityIndicator size={50} color='green' />
          </View>
     
          :<>
       <View>
            <Image  style={styles.image}
         source={{uri:`${imageUrl}/${problem.image_problem}`}} />                
           <Text style={styles.Prblm_title}>
              {problem.problemName}
           </Text>     
       </View>
       <View style={styles.containerSection}>
           <Text style={styles.title}>Problème</Text>
           <Text>
           {problem.description_problem}
               </Text>
       </View>
       <View style={styles.containerSection}>
           <Text style={styles.title}>Solution</Text>
           <Text>
                {problem.solution_problem}
               </Text>
       </View>
        <View style={{flex:1}}>
        <Text style={styles.textTitle}>Produits</Text>
      <FlatList 
        style={styles.listStyle}
      data={problem.products}
      keyExtractor={(item)=>item.id.toString()}
    //   numColumns={2}
      horizontal={true}
      renderItem={({item})=> <ProductCard item = {item} buyNow={buyNowPress} onAdded={onAddedPress} />}
      />
          </View>
         </>
          }
    </ScrollView>
  );
};

const ActionCreators = Object.assign(
    {},
    cartActions,
    authActions
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
  export default connect(mapStateToProps, mapDispatchToProps)(ProblemDetails);

const styles = StyleSheet.create({
    slide1:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
    },
    slide2:{
        flex:1,
        justifyContent:"center",
        backgroundColor:'#fff',
        alignItems:"center"
    },
    image:{resizeMode: "cover",
     height:150,
     width:"100%"},
     title:{
         fontWeight: "bold",
         fontSize: 15,
         fontStyle: "italic"
     },
     containerSection:{
         paddingVertical: 15,
         paddingHorizontal: 20
     },
     Prblm_title:{
         fontSize: 17,
         textAlign:'center',
         paddingVertical:10,
         fontWeight: 'bold',
         textTransform: 'uppercase',
         backgroundColor: 'white',
         elevation: 5,
         shadowColor: "#000",
         shadowOffset: {
           width: 0,
           height: 2
         },
         shadowOpacity: 0.25,
         shadowRadius: 4,
     },
     listStyle:{
        marginVertical: 10,
        marginHorizontal: 10,
    },
    textTitle:{
      textAlign: "center",
      fontSize: 16,
      paddingVertical: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase'
             
  }
});
