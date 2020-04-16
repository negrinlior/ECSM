const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");

const router=express.Router();


router.post('/UploadBdikot',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body;
        console.log(Bdy);
        console.log('***********************');
        console.log(JSON.stringify(Bdy));
        if (0>1){
                    sqlreq.output('Success', SQL.Int)
                    
                    var data=await DB.ExecuteSP(sqlreq,"BdikotLoad");
                    if (data.output.Success=1 && data.rowsAffected[0]>0){
                        res.send({Success:1,Reason:'Execute Success'});
                    }
                    else
                    {
                        res.send(JSON.stringify({Success:-1,Reason:'Execute Fail'}));
                    }
                }
    }catch(err){
        console.log(err);
        res.send(err);
    }   
});


module.exports=router;