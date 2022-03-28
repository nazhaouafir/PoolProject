import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://192.168.8.175:8000',
    headers:{
      "content-type":"application/json"
    },
    // timeout: 1000,

    
  });
export default instance