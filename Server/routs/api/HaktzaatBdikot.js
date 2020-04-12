const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");

const router=express.Router();
const SelectQry=`SELECT * FROM Permissions`;


router.get('/',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset(SelectQry);
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

router.post('/UpdateUser',async function(req,res){
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

        var data=await DB.ExecuteSP(sqlreq,"ECSM_UsersTableUpdate");
        if (data.output.Success=1 && data.rowsAffected[0]>0){
            res.send(JSON.stringify(Bdy));
        }
        else
        {
            Bdy.User='ERR'
            Bdy.First='שגיאה';
            Bdy.Last='לא נשמר';
            res.send(JSON.stringify(Bdy));
        }
       
    }catch(err){
        console.log(err);
        res.send(err);
    }   
});

router.post('/InsertUser',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;
        
        sqlreq.input('User',SQL.NVarChar,Bdy.User);
        sqlreq.input('First',SQL.NVarChar,Bdy.First);
        sqlreq.input('Last',SQL.NVarChar,Bdy.Last);
        sqlreq.input('Team',SQL.Int,Bdy.Team);
        sqlreq.input('PassWord',SQL.NVarChar,Bdy.PassWord);
        sqlreq.input('Email',SQL.NVarChar,Bdy.Email);
        sqlreq.input('Phone',SQL.NVarChar,Bdy.Phone);
        sqlreq.output('Success', SQL.Int)

        var data=await DB.ExecuteSP(sqlreq,"ECSM_UsersTableInsert");
        if (data.output.Success=1 && data.rowsAffected[0]>0){
            Bdy.ID=data.returnValue;
            res.send(JSON.stringify(Bdy));
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

router.post('/DeleteUser',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body;
        
        sqlreq.input('IDUser',SQL.Int,Bdy.key);
       
        sqlreq.output('Success', SQL.Int)

        var data=await DB.ExecuteSP(sqlreq,"ECSM_UsersTableDelete");
        if (data.output.Success=1 && data.rowsAffected[0]>0){
            
            res.send(JSON.stringify(Bdy));
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