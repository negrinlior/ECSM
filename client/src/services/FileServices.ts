const axios = require('axios');
//const FormData = require('form-data');
import ServerConfig from '../ServerConfig.js';


class FileServices {
    //UploadBdikot
    static async UploadBdikot(Fil){

      var x=await Fil;
      let formData = new FormData();
      formData.append('file1', x);

      await axios.post( ServerConfig.FileUploadAPI  + 'UploadBdikot/',
                formData
                ).then(response=>{
                  if (response.data.Success==1){
                      alert('נטען בהצלחה');
                  }else{
                      alert('ERROR : ' + response.data.Reason);
                  }
                  
                })
                .catch(e => {
                  alert('F' + e);
                });
      return 1;
    }

  

  }



export default FileServices;