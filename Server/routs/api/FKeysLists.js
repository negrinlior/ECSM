const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");
const router=express.Router();



router.get('/Customers',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT ID,CustomerName FROM Customers');
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

router.get('/Anafim',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT ID,Anaf as "anafnm" FROM Anafim');
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

router.get('/Kablanim',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT MisparKablan,Name FROM Kablanim');
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

router.get('/Mishtamshim',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT ID,[User] FROM Users');
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

router.get('/Rashuiot',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT ID,[Name] as "RNm" FROM Rashuiot');
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

router.get('/StageList',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT Code,StageName FROM StageList');
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


router.get('/NikudObjectList',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT Code,Description FROM ObjectType');
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


router.get('/NikudType',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT Code,Description FROM NikudType');
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


router.get('/MathActions',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT Code,Description FROM MathActions');
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

router.get('/NikudSettingsObjectList',async function(req,res){  
    try{
        var data=await DB.CommitSelectAndReturnRecordset('SELECT * FROM ECSM_NikudSettingsObjectListView');
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



module.exports=router;