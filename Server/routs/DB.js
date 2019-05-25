
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

function fCommitSelectAndReturnRecordset(callback){

    const pool=new SQL.ConnectionPool(DBConfig);
    var req= new SQL.Request(pool);
    
    pool.connect(function (err){
        if (err) {console.log(err);return;}
        else
        {
            req.query("SELECT * FROM Users",(err,recordset)=>{
                if (err){console.log(err);}
                else{
                    callback(recordset);    
                }
                pool.close();
            });

        };
    });
}

module.exports.CommitSelectAndReturnRecordset=fCommitSelectAndReturnRecordset;