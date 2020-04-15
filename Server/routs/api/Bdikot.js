const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");

const router=express.Router();
const SelectQry=`SELECT ID,Kablan,Rishayon,KablanSecondary,RishayonSecondary,Rashut,Mechraz,DateCreation,DateRangeText,StageCode,SrcFile,CustomerID,Anaf,BdikatAvID,SugBdikaMeuchedet FROM Bdikot ORDER BY ID DESC`;


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

router.post('/UpdateBdikot',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;

        sqlreq.input('ID',SQL.Int,Bdy.ID);
        sqlreq.input('Kablan',SQL.Int,Bdy.Kablan);
        sqlreq.input('Rishayon',SQL.NVarChar,Bdy.Rishayon);
        sqlreq.input('KablanSecondary',SQL.NVarChar,Bdy.KablanSecondary);
        sqlreq.input('RishayonSecondary',SQL.NVarChar,Bdy.RishayonSecondary);
        sqlreq.input('Rashut',SQL.Int,Bdy.Rashut);
        sqlreq.input('Mechraz',SQL.NVarChar,Bdy.Mechraz);
        sqlreq.input('DateCreation',SQL.NVarChar,Bdy.DateCreation);
        sqlreq.input('DateRangeText',SQL.NVarChar,Bdy.DateRangeText);
        sqlreq.input('StageCode',SQL.Int,Bdy.StageCode);
        sqlreq.input('SrcFile',SQL.NVarChar,Bdy.SrcFile);
        sqlreq.input('CustomerID',SQL.Int,Bdy.CustomerID);
        sqlreq.input('Anaf',SQL.Int,Bdy.Anaf);
        sqlreq.input('BdikatAvID',SQL.Int,Bdy.BdikatAvID);
        sqlreq.input('SugBdikaMeuchedet',SQL.NVarChar,Bdy.SugBdikaMeuchedet);

        sqlreq.output('Success', SQL.Int)
        
        var data=await DB.ExecuteSP(sqlreq,"ECSM_BdikotTableUpdate");
        if (data.output.Success=1 && data.rowsAffected[0]>0){
            res.send(JSON.stringify(Bdy));
        }
        else
        {
            Bdy.KablanSecondary='ERR'
            Bdy.Mechraz='שגיאה';
            res.send(JSON.stringify(Bdy));
        }
       
    }catch(err){
        console.log(err);
        res.send(err);
    }   
});

router.post('/InsertBdikot',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;
        
        // sqlreq.input('Customer',SQL.Int,Bdy.Customer);
        // sqlreq.input('Anaf',SQL.Int,Bdy.Anaf);
        // sqlreq.input('Kablan',SQL.Int,Bdy.Kablan);
        // sqlreq.input('Rashuiot',SQL.Int,Bdy.Rashuiot);
        // sqlreq.input('UserName',SQL.Int,Bdy.User1);
        // sqlreq.input('BackupUser',SQL.Int,Bdy.User2);
        // sqlreq.input('BackupUser2',SQL.Int,Bdy.User3);
        
        sqlreq.output('Success', SQL.Int)

        // var data=await DB.ExecuteSP(sqlreq,"ECSM_PermissionsTableInsert");
        // if (data.output.Success=1 && data.rowsAffected[0]>0){
        //     Bdy.ID=data.returnValue;
        //     res.send(JSON.stringify(Bdy));
        // }
        // else
        // {
        //     res.status(204).send('err');
        // }
        return 1;
    }catch(err){
        console.log(err);
        res.send(err);
    }   
});

router.post('/DeleteBdikot',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body;
        sqlreq.input('ID2Delete',SQL.Int,Bdy.key);
       
        sqlreq.output('Success', SQL.Int)

       var data=await DB.ExecuteSP(sqlreq,"ECSM_BdikotTableDelete");
        if (data.output.Success=1){
            
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