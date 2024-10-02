import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api/';

axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {

    if(error.code == 'ERR_NETWORK'){
            alert('Não foi possível conectar ao servidor!');
    }

    return error.response;

  });