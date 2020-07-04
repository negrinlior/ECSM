const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");

const router=express.Router();
const SelectQryClientDisterbution =`select * from ECSM_BI_ClientDisterbution ORDER BY CustomerID`;
const SelectQryBdikotByClientAndYear =`select * from ECSM_BI_BdikotByClientAndYear  where [שנה]>2010 order by [שנה]`;
const SelectQryStats =`select * from ECSM_BI_Stats`;

router.get('/',async function(req,res){  
    try{
        var CustomersPieData= [
            { x: 'Jan', y: 3, text:'January' }, { x: 'Feb', y: 3.5, text: 'February' },
            { x: 'Mar', y: 7, text: 'March' }, { x: 'Apr', y: 8, text: 'April' }
              ];
        res.send(JSON.stringify(CustomersPieData));
             
        
    }catch(err){
        res.send(err);
    }   

});

router.get('/ClientDisterbution',async function(req,res){  
     try{
           
         var data=await DB.CommitSelectAndReturnRecordset(SelectQryClientDisterbution);
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

 
router.get('/BdikotByClientAndYear',async function(req,res){  
    try{
          
        var data=await DB.CommitSelectAndReturnRecordset(SelectQryBdikotByClientAndYear);
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


router.get('/Stats',async function(req,res){  
    try{
          
        var data=await DB.CommitSelectAndReturnRecordset(SelectQryStats);
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