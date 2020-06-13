const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");
const OtherFunctions=require('../Other');

const router=express.Router();
const SelectQry=`SELECT * FROM DatesHariga`;


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

router.post('/UpdateTarichiChariga',async function(req,res){
    try{
        var sqlreq= new SQL.Request();
        var Bdy=await req.body.value;

        sqlreq.input('vID',SQL.Int,Bdy.ID);
        sqlreq.input('vBdikaID',SQL.Int,Bdy.BdikaID);
        sqlreq.input('vDateOfHariga',SQL.NVarChar,OtherFunctions.FixDate(Bdy.DateOfHariga));
        sqlreq.input('vShimua1',SQL.NVarChar,OtherFunctions.FixDate(Bdy.Shimua1));
        sqlreq.input('vYaadShimua1',SQL.NVarChar,OtherFunctions.FixDate(Bdy.YaadShimua1));
        sqlreq.input('vShimua2',SQL.NVarChar,OtherFunctions.FixDate(Bdy.Shimua2));
        sqlreq.input('vYaadShimua2',SQL.NVarChar,OtherFunctions.FixDate(Bdy.YaadShimua2));
        sqlreq.input('vHatraaEmail',SQL.NVarChar,OtherFunctions.FixDate(Bdy.HatraaEmail));
        sqlreq.input('vYaadHatraaEmail',SQL.NVarChar,OtherFunctions.FixDate(Bdy.YaadHatraaEmail));
        sqlreq.input('vHatraaLetter',SQL.NVarChar,OtherFunctions.FixDate(Bdy.HatraaLetter));
        sqlreq.input('vYaadHatrraLetter',SQL.NVarChar,OtherFunctions.FixDate(Bdy.YaadHatrraLetter));
        sqlreq.input('vIdkunRashut',SQL.NVarChar,OtherFunctions.FixDate(Bdy.IdkunRashut));
        sqlreq.input('vTizkuretIdkunRashut',SQL.NVarChar,OtherFunctions.FixDate(Bdy.TizkuretIdkunRashut));
        sqlreq.input('vMeetingRashut',SQL.NVarChar,OtherFunctions.FixDate(Bdy.MeetingRashut));
        sqlreq.input('vShimuaRashut',SQL.NVarChar,OtherFunctions.FixDate(Bdy.ShimuaRashut));
        sqlreq.input('vYaadShimuaRashut',SQL.NVarChar,OtherFunctions.FixDate(Bdy.YaadShimuaRashut));
        sqlreq.input('vHeara',SQL.NVarChar,Bdy.Heara);
        sqlreq.input('vSchumIkavon',SQL.NVarChar,Bdy.SchumIkavon);
        sqlreq.input('vSchumIkavonHaktana',SQL.NVarChar,Bdy.SchumIkavonHaktana);
        sqlreq.input('vSchumArvut',SQL.NVarChar,Bdy.SchumArvut);
        sqlreq.input('vTokefArvot',SQL.NVarChar,OtherFunctions.FixDate(Bdy.TokefArvot));
        sqlreq.input('vHatzaraRochbit',SQL.NVarChar,Bdy.HatzaraRochbit);
        
        sqlreq.output('Success', SQL.Int)

         var data=await DB.ExecuteSP(sqlreq,"ECSM_DatesHarigaTableUpdate");

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