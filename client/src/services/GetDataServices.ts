const axios = require('axios');
import ServerConfig from '../ServerConfig.js';

class GetDataServices {
    //Get users
    static GetUsersData(grid: any){
      var gridObj = grid 
      
      return axios.get(ServerConfig.UsersAPI)
                    .then(response => {
                      gridObj.dataSource.dataSource.json = response.data; 
                      gridObj.refreshColumns();   
                      return 1; 
                    })
                    .catch(e => {
                      alert('F' + e);
                    })
    }

}

export default GetDataServices;