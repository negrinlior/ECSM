const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");

const router=express.Router();

router.get('/',async function(req,res){
    var Qry=`SELECT * FROM Users`;
    
    try{
        //console.log('Get users');
        var data=await DB.CommitSelectAndReturnRecordset(Qry);
        if (data.rowsAffected>0){
            res.send(JSON.stringify(data.recordsets[0]));
            //console.log(data.rowsAffected);
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
    // console.log(Bdy);
    // res.status(200).send();

    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;
        
        sqlreq.input('IDUser',SQL.Int,Bdy.ID);
        sqlreq.input('User',SQL.NVarChar,Bdy.User);
        sqlreq.input('First',SQL.NVarChar,Bdy.First);
        sqlreq.input('Last',SQL.NVarChar,Bdy.Last);
        sqlreq.input('Team',SQL.Int,Bdy.Team);
        sqlreq.input('PassWord',SQL.NVarChar,Bdy.PassWord);
        sqlreq.input('Email',SQL.NVarChar,Bdy.Email);
        sqlreq.input('Phone',SQL.NVarChar,Bdy.Phone);
        sqlreq.output('Success', SQL.Int)

        var data=await DB.ExecuteSP(sqlreq,"ECSM_UpdateUsersTable");
        if (data.output.Success=1 && data.rowsAffected[0]>0){
            res.status(200).send();
        }
        else
        {
            res.status(204).send('err');
        }
       
    }catch(err){
        console.log(err);
        res.send(err);
    }   
});

module.exports=router;