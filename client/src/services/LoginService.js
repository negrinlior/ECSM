// import axios from 'axios';
const axios = require('axios');

const url='http://localhost:5000/api/login/signin';

class LoginService {
    //Get user

    //Post user
    static postUser(UN,PAS){
        return axios.post(url,{
            username: UN,
            password: PAS
        })
        .then(function (response) {
            return response;//.status;
          })
          .catch(function (error) {
            alert('F' + error);
          });
    }
}

export default LoginService;