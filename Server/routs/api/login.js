const express=require('express');
const DB=require('../DB');
const jwt = require('jsonwebtoken');

const router=express.Router();

router.get('/',(req,res)=>{
    res.send('Hello you need to sing in first'  );
});

router.post('/signin',async function(req,res){
    var UserName=req.body.username;
    var Password=req.body.password;
    var Qry=`SELECT * FROM Users WHERE [User]='${UserName}' AND [PassWord]='${Password}'`;

    // console.log(Qry);
    try{
        var data=await DB.CommitSelectAndReturnRecordset(Qry);
        if (data.rowsAffected>0){
            let token= jwt.sign({user: UserName, password:Password},"Secret",{issuer: "ECSSystems" ,expiresIn: 86400}); //Expiers in 24H
            // console.log(token);
            // res.statusCode=200;
            // res.send({ auth: true, token: token, user: user });
            res.status(200).send({ auth: true, token: token, user: user });
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