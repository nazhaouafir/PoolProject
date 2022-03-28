import { StyleSheet,
     Text, View, Image, ScrollView, FlatList, Pressable } from 'react-native';
import React,{Component, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import Grid from '../../../Components/Grid';
import data from '../../../Data/data'
import HorizontalList from '../../../Components/HorizontalList';
import ProductList from '../../../Components/ProductList';
import products from '../../../Data/products';
import Header from '../../../Components/Header';
import ProblemsList from '../ProblemsList';
import VerticalList from '../../../Components/VerticalList';
import { imageUrl } from '../../../api/imageUrl';
import instance from '../../../api';
import * as getProduits from '../../../Data/produits';
import { problemItem } from '../../../api/services';

const ProblemDetails =({route})=>{
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
    function getProblemItem(){

        problemItem(problemId)
        .then((item)=>{
            setProblem({
                image_problem:item.image_problem,
                problemName: item.problemName,
                description_problem: item.description_problem,
                solution_problem:item.solution_problem,
                products:item.products
            })
            console.warn(item)
        }).catch((err)=>{
            console.error(err)
        })
      }
      useEffect(()=>{
           return getProblemItem()
      },[])

  
 
    const navigation = useNavigation();

  return (
      <ScrollView 
      showsVerticalScrollIndicator={false} >
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
            <ProductList title="Products" products={problem.products}/>
    </ScrollView>
  );
};

export default ProblemDetails;

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
     }
});
