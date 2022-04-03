import { Text, View } from 'react-native'
import React from 'react'
import instance from '.';
import * as SecureStore from 'expo-secure-store';

export async function getProduct(){
    try {
        const res = await instance.get('/api/product');
        return res.data.products;
    } catch (err) {
        return console.error(err);
    }
}
export async function getProblems(){
    try{
        const res = await instance.get('/api/problem');
        return res.data.problems;
    } catch(err){
        return console.error(err)
    }
}
export async function problemItem(problem){
    try{
      let token =await SecureStore.getItemAsync('token')
     instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await instance.get(`/api/problem/${problem}`);
        return res.data.problem;
    } catch(err){
        return console.error(err)
    }
} 
export async function productItem(product){
    try{
        let token = await SecureStore.getItemAsync('token')
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await instance.get(`/api/product/${product}`);
            return res.data.product
    } catch(err){
        return console.error(err)
    }
}
export async function category(category){
    try{
        let token = await SecureStore.getItemAsync('token')
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await instance.get(`/api/category/${category}`);

            return res.data.category
    } catch(err){
        return console.error(err)
    }
}
export async function getAdresses(token){
    try{
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await  instance.get('/api/user');
            return res.data.user.infos
    } catch(err){
        return console.error(err)
    }
}
export async function getUser(token){
    try{
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await  instance.get('/api/user');
            return res.data.user
    }catch(err){
        return false

    }
}
export async function getUserID(token){
    try{
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await  instance.get('/api/user');
            return res.data.user.id.toString()
    }catch(err){
        return console.error(err)

    }
}
export async function editUser(token,info){
    try{
        // edituser
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await instance.post('/api/edituser',{
            token:token,
            username: info.username,
            full_name: info.full_name,
            email:info.email,
            adresse:info.adresse,
            telefon: info.telefon,
        });

        return res.data
    }catch(err){

    }
}
export async function sendCommande(token,products){
    try{
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await instance.post('/api/commande',{
            token:token,
            products: products,
        });

        return res
    }catch(err){
        console.error(err)
    }
}