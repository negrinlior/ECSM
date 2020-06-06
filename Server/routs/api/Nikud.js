const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");
const OtherFunctions=require('../Other');

const router=express.Router();
const SelectQry=`SELECT * FROM ECSM_NikudSettingsView`;


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
        
        sqlreq.input('vID',SQL.Int,Bdy.ID);
        sqlreq.input('vObjectTypeDis',SQL.NVarChar,Bdy.ObjectType);
        sqlreq.input('vObjectCodeDis',SQL.NVarChar,Bdy.ObjCodeDis);
        sqlreq.input('vDateStart',SQL.NVarChar,OtherFunctions.FixDate(Bdy.DateStart));
        if (Bdy.DateEnd){
            sqlreq.input('vDateEnd',SQL.NVarChar,OtherFunctions.FixDate(Bdy.DateEnd));            
        }
        else{
            sqlreq.input('vDateEnd',SQL.NVarChar,Bdy.DateEnd);
        }
        sqlreq.input('vNikudType',SQL.Int,Bdy.NikudType);
        sqlreq.input('vNikudValue',SQL.NVarChar,Bdy.NikudValue);
        sqlreq.input('vMachpil',SQL.NVarChar,Bdy.Machpil);
        sqlreq.input('vMathAction',SQL.Int,Bdy.MathAction);
        
        sqlreq.output('Success', SQL.Int)

         var data=await DB.ExecuteSP(sqlreq,"ECSM_NikudTableUpdate");

         if (data.output.Success=1 && data.rowsAffected[0]>0){
             res.send(JSON.stringify(Bdy));
         }
         else
         {
             Bdy.ObjectType=null;
             Bdy.ObjectCodeDis='לא נשמר';
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
        
        sqlreq.input('vObjectTypeDis',SQL.NVarChar,Bdy.ObjectType);
        sqlreq.input('vObjectCodeDis',SQL.NVarChar,Bdy.ObjCodeDis);
        sqlreq.input('vDateStart',SQL.NVarChar,OtherFunctions.FixDate(Bdy.DateStart));
        if (Bdy.DateEnd){
            sqlreq.input('vDateEnd',SQL.NVarChar,OtherFunctions.FixDate(Bdy.DateEnd));            
        }
        else{
            sqlreq.input('vDateEnd',SQL.NVarChar,Bdy.DateEnd);
        }
        sqlreq.input('vNikudType',SQL.Int,Bdy.NikudType);
        sqlreq.input('vNikudValue',SQL.NVarChar,Bdy.NikudValue);
        sqlreq.input('vMachpil',SQL.NVarChar,Bdy.Machpil);
        sqlreq.input('vMathAction',SQL.Int,Bdy.MathAction);

        sqlreq.output('Success', SQL.Int)

        var data=await DB.ExecuteSP(sqlreq,"ECSM_NikudTableInsert");
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

        var data=await DB.ExecuteSP(sqlreq,"ECSM_NikudTableDelete");
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