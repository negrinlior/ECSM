const axios = require('axios');
import ServerConfig from '../ServerConfig.js';

class GetDataServices {
    //Get users = OLD NOT IN USE
    /*
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
    */

      
    //Get Data for grid
    static GetDataForGrid(grid: any,typ: string){
      var gridObj = grid 
      return axios.get(ServerConfig.ServerAPI + typ + '/')
                    .then(response => {
                      gridObj.dataSource.dataSource.json = response.data; 
                      gridObj.refreshColumns();   
                      return 1; 
                    })
                    .catch(e => {
                      alert('F' + e);
                    })
    }
    
    //Get Fkey List
    static GetFkeyList(typ: string){

      return axios.get(ServerConfig.FKeysListsAPI + typ + '/')
                    .then(response => {
                      return response.data; 
                    })
                    .catch(e => {
                      alert('F' + e);
                    })
    }

    //repopulate grid
    static RegenrateDataForGrid(grid: any,typ: string){
      var gridObj = grid
      return axios.get(ServerConfig.ServerAPI + typ + '/')
                  .then(response => {
                        gridObj.dataSource.dataSource.json  =[];
                        gridObj.columns=[];
                        gridObj.dataSource.dataSource.json  = response.data;
                        gridObj.refreshColumns();
                        return 1;
                  })
      .catch(e => {
                  alert('F' + e);
      })
    }

     //Run Stored Procedure by Get API usually success=1, fail=-1
     static RunSPByGetAPI(APIName: string){

      return axios.get(ServerConfig.ServerAPI + APIName + '/')
                    .then(response => {
                      return response.data; 
                    })
                    .catch(e => {
                      alert('F' + e);
                    })
    }
}

export default GetDataServices;