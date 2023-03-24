import axios from 'axios';

const axiosInstance = axios.create({
    /* baseURL: 'http://localhost:8080', */
    baseURL: 'https://amazingback-production.up.railway.app/',    
   // timeout: 1000,
   // headers: {
   //     'Content-Type': 'application/json',
   //     'Accept': 'application/json'
   // }
});

export default axiosInstance;
