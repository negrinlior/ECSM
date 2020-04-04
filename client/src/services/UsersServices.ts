// import axios from 'axios';
const axios = require('axios');

const url='http://localhost:5000/api/UsersAPI/';

class UsersServices {
    //Get users
    static GetUsersData(grid: any){
      var gridObj = grid 
      
      return axios.get(url)
                    .then(response => {
                      gridObj.dataSource.dataSource.json = response.data; 
                      gridObj.refreshColumns();   
                      return 1; 
                    })
                    .catch(e => {
                      alert('F' + e);
                    })
  }

    static GetUsersData1()
      {
        return 'hi';
      }
}

export default UsersServices;