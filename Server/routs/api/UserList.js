const express=require('express');
const DB=require('../DB');
const config = require('../../config');

const router=express.Router();

router.get('/',async function(req,res){
    var Qry=`SELECT * FROM Users`;

    try{
        var data=await DB.CommitSelectAndReturnRecordset(Qry);
        if (data.rowsAffected>0){
            
        }
        else
        {
            res.status(204).end();
        }
       
        
    }catch(err){
        res.send(err);
    }   

    res.send('Hello you need to sing in first'  );
});

router.post('/SaveData',async function(req,res){
    
});

module.exports=router;