const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");

const router=express.Router();
const SelectQry=`SELECT * FROM [Nikud]`;


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

router.post('/UpdateNikud',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;

        sqlreq.input('ID',SQL.Int,Bdy.ID);
        sqlreq.input('Customer',SQL.Int,Bdy.Customer);
        sqlreq.input('Anaf',SQL.Int,Bdy.Anaf);
        sqlreq.input('Kablan',SQL.Int,Bdy.Kablan);
        sqlreq.input('Rashuiot',SQL.Int,Bdy.Rashuiot);
        sqlreq.input('UserName',SQL.Int,Bdy.User1);
        sqlreq.input('BackupUser',SQL.Int,Bdy.User2);
        sqlreq.input('BackupUser2',SQL.Int,Bdy.User3);
        sqlreq.output('Success', SQL.Int)
        
        var data=await DB.ExecuteSP(sqlreq,"ECSM_PermissionsTableUpdate");
        if (data.output.Success=1 && data.rowsAffected[0]>0){
            res.send(JSON.stringify(Bdy));
        }
        else
        {
            Bdy.User1='ERR'
            Bdy.Customer='שגיאה';
            Bdy.Anaf='לא נשמר';
            res.send(JSON.stringify(Bdy));
        }
       
    }catch(err){
        console.log(err);
        res.send(err);
    }   
});

router.post('/InsertNikud',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;
        
        sqlreq.input('Customer',SQL.Int,Bdy.Customer);
        sqlreq.input('Anaf',SQL.Int,Bdy.Anaf);
        sqlreq.input('Kablan',SQL.Int,Bdy.Kablan);
        sqlreq.input('Rashuiot',SQL.Int,Bdy.Rashuiot);
        sqlreq.input('UserName',SQL.Int,Bdy.User1);
        sqlreq.input('BackupUser',SQL.Int,Bdy.User2);
        sqlreq.input('BackupUser2',SQL.Int,Bdy.User3);
        sqlreq.output('Success', SQL.Int)

        var data=await DB.ExecuteSP(sqlreq,"ECSM_PermissionsTableInsert");
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

router.post('/DeleteNikud',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body;
        
        sqlreq.input('IDper',SQL.Int,Bdy.key);
       
        sqlreq.output('Success', SQL.Int)

        var data=await DB.ExecuteSP(sqlreq,"ECSM_PermissionsTableDelete");
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