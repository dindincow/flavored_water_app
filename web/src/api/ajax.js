
import axios from 'axios';
import Vue from 'vue';


const http = axios.create({
    baseURL:'http://localhost:3000/api'
})

// 請求攔截
http.interceptors.request.use(function (config) {
   
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;

}, function (error) {
    console.log('error',error)
    // return Promise.reject(error);
});

// 響應攔截
http.interceptors.response.use(function (response) {
  
    return response.data;

  }, function (error) {

    if(error.response.data.message){ 
       
        Vue.prototype.$toast.show(error.response.data.message, 1000)
    } 

    
    // if(error.response.status===401){  
    //     router.push('/login')
    // }

    return Promise.reject(error);
});

export default http;