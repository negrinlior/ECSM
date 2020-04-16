const axios = require('axios');
//const FormData = require('form-data');
import ServerConfig from '../ServerConfig.js';


class FileServices {
    //UploadBdikot
    static async UploadBdikot(Fil){
      var x=await Fil;
      const FormData = require('form-data');
      let formData = new FormData();
      formData.append('file', x);
      // {
      //   'Content-Type':  formData.getHeaders()['content-type']
      //           }
      axios.post( ServerConfig.FileUploadAPI  + 'UploadBdikot/',
                {file:x,ID:1}
                ).then(function(){
                  alert('SUCCESS!!');
                })
                .catch(function(){
                  alert('FAILURE!!');
                });
      /* return axios.get(ServerConfig.FileUploadAPI + typ + '/')
                    .then(response => {
                      return response.data; 
                    })
                    .catch(e => {
                      alert('F' + e);
                    }) */
    }
}

export default FileServices;