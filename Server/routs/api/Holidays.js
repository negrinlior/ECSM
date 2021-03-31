const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");
const OtherFunctions=require('../Other');

const router=express.Router();
const SelectQry=`SELECT * FROM Holidays`;


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

router.post('/UpdateHolidays',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;
        
        sqlreq.input('vID',SQL.Int,Bdy.ID);
        sqlreq.input('vDate',SQL.NVarChar,OtherFunctions.FixDate(Bdy.Date));
        sqlreq.input('vDescription',SQL.NVarChar,Bdy.Description);     
        
        sqlreq.output('Success', SQL.Int)

         var data=await DB.ExecuteSP(sqlreq,"ECSM_HolidaysTableUpdate");

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

router.post('/InsertHolidays',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;
        
        sqlreq.input('vDate',SQL.NVarChar,OtherFunctions.FixDate(Bdy.Date));
        sqlreq.input('vDescription',SQL.NVarChar,Bdy.Description);     
        

        sqlreq.output('Success', SQL.Int)

        var data=await DB.ExecuteSP(sqlreq,"ECSM_HolidaysTableInsert");
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

router.post('/DeleteHolidays`',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body;
        
        sqlreq.input('vID',SQL.Int,Bdy.key);
       
        sqlreq.output('Success', SQL.Int)

        var data=await DB.ExecuteSP(sqlreq,"ECSM_HolidaysTableDelete");
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