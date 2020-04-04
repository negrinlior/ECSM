const express=require('express');
const DB=require('../DB');
const config = require('../../config');

const router=express.Router();

router.get('/',async function(req,res){
    var Qry=`SELECT * FROM Users`;

    try{
        //console.log('Get users');
        var data=await DB.CommitSelectAndReturnRecordset(Qry);
        if (data.rowsAffected>0){
            res.send(JSON.stringify(data.recordsets[0]));
            console.log(data.rowsAffected);
            //console.log(JSON.stringify(data.recordsets[0]));
            //res.send({Items: data.recordsets[0], Count:data.rowsAffected});
            
            
        }
        else
        {
            res.status(204).end();
        }
       
        
    }catch(err){
        res.send(err);
    }   

});

router.post('/UpdateUser',async function(req,res){
    console.log('Hi');
});

module.exports=router;