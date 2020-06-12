const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");
const OtherFunctions=require('../Other');

const router=express.Router();
const SelectQry=`SELECT * FROM StageToCustomerSettings`;


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

router.post('/UpdateNihulShlavimToClient',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;

        sqlreq.input('vID',SQL.Int,Bdy.ID);
        sqlreq.input('vDaysForMalab',SQL.Int,Bdy.DaysForMalab);
        sqlreq.input('vDaysForHatrahLekablanLefniTarichYaad',SQL.Int,Bdy.DaysForHatrahLekablanLefniTarichYaad);
        sqlreq.input('vDaysForKablanToReturnAnswer',SQL.Int,Bdy.DaysForKablanToReturnAnswer);
        sqlreq.input('vMailCCList',SQL.NVarChar,Bdy.MailCCList);
        sqlreq.output('Success', SQL.Int)

         var data=await DB.ExecuteSP(sqlreq,"ECSM_StageToCustomerSettingsTableUpdate");

         if (data.output.Success=1 ){
             res.send(JSON.stringify(Bdy));
         }
         else
         {
             Bdy.DaysForMalab='לא נשמר';
             Bdy.MailCCList='לא נשמר';
             Bdy.DaysForKablanToReturnAnswer='לא נשמר';
             Bdy.DaysForHatrahLekablanLefniTarichYaad='לא נשמר';
             res.send(JSON.stringify(Bdy));
         }
       
    }catch(err){
        console.log(err);
        res.send(err);
    }   
});


module.exports=router;