const config = require('../config');
const SQL=require("mssql");

var DBConfig=
{
    server:config.DBserver,
    database:config.DBName,
    user:config.DBUser,
    password:config.DBPassword,
    encrypt: true,
    port:config.DBPort

};


function fCommitSelectAndReturnRecordset(QrySTR){
    return new Promise((resolve,reject)=>{
        
        const pool=new SQL.ConnectionPool(DBConfig);
        var req= new SQL.Request(pool);
    
        
        pool.connect(function (err){ //Try to connect
            if (err) {
                console.log(err);
                reject({err});
            }
            else
            {
                req.query(QrySTR,(err,recordset)=>{ //commit query
                    if (err){
                        console.log(err);
                    }
                    else{
                        resolve(recordset);
                    }
                    pool.close();
                });

            };
        });
    });
}

    


module.exports.CommitSelectAndReturnRecordset=fCommitSelectAndReturnRecordset;