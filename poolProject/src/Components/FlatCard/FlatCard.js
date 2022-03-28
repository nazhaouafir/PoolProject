import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, TextInput } from 'react-native'
import { styles } from '../../Styles/styles'
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomInput from '../CustomInput';
import {useForm, Controller} from 'react-hook-form';
import { imageUrl } from '../../api/imageUrl';
const FlatCard = ({item, onPress, onRemove, onchangeQuantity,decreaseQuantity,myquantity}) => {
  
  
  const{id,category_id,title_product,description_product,marque,poid, price,image_product, qty} = item

 
   
 return (
        <>
      <View  style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.cardImage}>
            <Image
            
              style={{ height: 90, width: 90, borderRadius: 20, }}
              source={{uri:`${imageUrl}/${image_product}`}}
            />
          </View>
          <View style={{ flex: 0.5, marginHorizontal: 12, overflow: "hidden" }}>
            <Text style={styles.cardTitle}>{title_product}</Text>
            <Text style={styles.cardLocation}>Emballage : {poid}</Text>
            <Text style={styles.cardPrice}>Prix {price} DH</Text>
            <View style={styles.quatite}>
             <Pressable onPress={()=>decreaseQuantity(id,qty)} style={{marginVertical:3}}>
             <AntDesign name="minuscircleo" size={24} color="#cccccc" />
             </Pressable >
                <Text style={{fontSize:18}}>
                {qty}
                </Text>
             <Pressable onPress={()=>onchangeQuantity(id,qty)} style={{marginVertical:3}}>
                    <AntDesign name="pluscircleo"   size={24} color="#cccccc" />
            </Pressable>
            </View>
          </View>
          <View style={{ flex: 0.1, marginHorizontal: 1, overflow: "hidden",alignItems:'flex-end' }}>
             <Pressable onPress={()=>onRemove(item.id)}>
             <AntDesign name="close" size={24} color="red" />
             </Pressable>
          </View>
        </View>
        
      </View>
    </>
    )
}

export default FlatCard

