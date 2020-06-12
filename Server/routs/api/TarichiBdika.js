const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");
const OtherFunctions=require('../Other');

const router=express.Router();
const SelectQry=`SELECT ID,BdikotID,StageCode,StageStatus,StageYaadDateAuto,StageYaadDateManual,DateYaadSpecial,DateOfPaperWork,DateOfHfakatDoch FROM ReportStages`;


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

router.post('/UpdateTarichiBdikaAPI',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;

        sqlreq.input('vID',SQL.Int,Bdy.ID);
        sqlreq.input('vStageYaadDateAuto',SQL.NVarChar,OtherFunctions.FixDate(Bdy.StageYaadDateAuto));
        sqlreq.input('vStageYaadDateManual',SQL.NVarChar,OtherFunctions.FixDate(Bdy.StageYaadDateManual));
        sqlreq.input('vStageUpdateDate',SQL.NVarChar,OtherFunctions.FixDate(Bdy.StageUpdateDate));
        sqlreq.input('vDateOfPaperWork',SQL.NVarChar,OtherFunctions.FixDate(Bdy.DateOfPaperWork));
        sqlreq.input('vDateOfHfakatDoch',SQL.NVarChar,OtherFunctions.FixDate(Bdy.DateOfHfakatDoch));
        sqlreq.input('vDateYaadSpecial',SQL.NVarChar,OtherFunctions.FixDate(Bdy.DateYaadSpecial));			
        
        sqlreq.output('Success', SQL.Int)

         var data=await DB.ExecuteSP(sqlreq,"ECSM_ReportStagesTableForDatesUpdate");

         if (data.output.Success=1 && data.rowsAffected0>0){
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


module.exports=router;