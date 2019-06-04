const express=require('express');
const DB=require('../DB');

const router=express.Router();

router.get('/',(req,res)=>{
    res.send('Hello you need to sing in first'  );
});

router.post('/signin',async function(req,res){
    var UserName=req.body.username;
    var Password=req.body.password;
    var Qry=`SELECT * FROM Users WHERE [User]='${UserName}' AND [PassWord]='${Password}'`;

    console.log(Qry);
    try{
        var data=await DB.CommitSelectAndReturnRecordset(Qry);
        if (data.rowsAffected>0){
            res.statusCode=200;
            res.send('Success');
        }
        else
        {
            res.statusCode=204;
            res.send('Fail');
        }
       
        
    }catch(err){
        res.send(err);
    }   
});

module.exports=router;