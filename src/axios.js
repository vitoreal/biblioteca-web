import axios from "axios";

//axios.defaults.baseURL = 'http://localhost:8000/api/';

 // Do something before request is sent
 axios.interceptors.request.use(function (config) {


    config.defaults.baseURL = 'http://localhost:8000/api/';

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {

    if(error.code == 'ERR_NETWORK'){
            alert('Não foi possível conectar ao servidor!');
    }

    return error.response;

  });