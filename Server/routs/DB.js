
const SQL=require("mssql");

var DBConfig=
{
    server:'DESKTOP-CDGMIRH\\ECS',
    database:'MALAB',
    user:'ECSMUser',
    password:'ECSMUser',
    encrypt: true,
    port:1433
};

// function OLDNOPROMISE_fCommitSelectAndReturnRecordset(QrySTR,callback){

//     const pool=new SQL.ConnectionPool(DBConfig);
//     var req= new SQL.Request(pool);
    
//     pool.connect(function (err){ //Try to connect
//         if (err) {console.log(err);return;}
//         else
//         {
//             req.query(QrySTR,(err,recordset)=>{ //commit query
//                 if (err){console.log(err);}
//                 else{
//                     callback(recordset);    
//                 }
//                 pool.close();
//             });

//         };
//     });
// }

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