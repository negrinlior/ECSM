const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");

const router=express.Router();
const SelectQryLakochot=`SELECT * FROM CustomersView`;
const SelectQryAnafim=`SELECT * FROM AvafimView`;
const SelectQryRashuiot=`SELECT * FROM RashuiotView`;
const SelectQryKablanim=`SELECT * FROM KablanimView`;
const SelectQryMechrazim=`SELECT * FROM MechreazimView`;


router.get('/',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset(SelectQryLakochot);
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

router.get('/Anafim/',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset(SelectQryAnafim);
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

router.get('/Lakochot/',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset(SelectQryLakochot);
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

router.get('/Kablanim/',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset(SelectQryKablanim);
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

router.get('/Rashuiot/',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset(SelectQryRashuiot);
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

router.get('/Mechrazim/',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset(SelectQryMechrazim);
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

router.get('/LoadMetaData',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
                
        var data=await DB.ExecuteSP(sqlreq,"LoadAllDataTBL");
        res.send('1');
       
    }catch(err){
        //console.log(err);
        //res.send(err);
        res.send('-1');

    }   
});



module.exports=router;