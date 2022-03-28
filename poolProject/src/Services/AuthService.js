import * as SecureStore from 'expo-secure-store';
import instance  from '../api';
import * as Device from 'expo-device';

export const login = (email,password)=>{
    instance.post(`/api/login`,{
        deviceName: Device.modelName,
        email: email,
        password: password
      }).then((res)=>{
        SecureStore.setItemAsync('token', JSON.stringify(res.data.token));
    }).catch((err)=>{
      console.error(err)
    })
    return username;

}
export const register = ()=>{

}
export const logout = (token)=>{
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    instance.post('/api/logout').then((res)=>{
      SecureStore.setItemAsync('token', null);
      SecureStore.setItemAsync('user', null);
      console.warn(res.data)
    }).catch((err)=>{
      console.error(err)
    })
}