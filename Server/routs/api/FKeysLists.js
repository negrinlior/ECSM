const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");
const router=express.Router();



router.get('/Customers',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT ID,CustomerName FROM Customers');
        if (data.rowsAffected>0){
            res.send(JSON.stringify(data.recordsets[0]));
        }
        else
        {
            res.status(204).end();
        }
       
        
    }catch(err){
        res.send(err);
    }   

});


module.exports=router;