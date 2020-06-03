const express=require('express');
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");

const router=express.Router();
const SelectQry=`SELECT * FROM ECSM_NikudSettingsView`;

function FixDate(DtStr) {
    var DtNd=DtStr.split('T')[0];
    if (DtStr.split('T')[1].split(':')[0]!="00"){
        var d=new Date(DtNd);
        d.setDate(d.getDate() +1);
        DtNd=d.toISOString().split('T')[0];
    }
    return DtNd;   // The function returns the product of p1 and p2
  }
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
        var DtStrt=Bdy.DateStart.split('T')[0];
        console.log(Bdy);
        
        sqlreq.input('ID',SQL.Int,Bdy.ID);
        sqlreq.input('ObjectTypeDis',SQL.NVarChar,Bdy.ObjectType);
        sqlreq.input('ObjectCodeDis',SQL.NVarChar,Bdy.ObjCodeDis);
        sqlreq.input('DateStart',SQL.NVarChar,FixDate(Bdy.DateStart));
        if (Bdy.DateEnd){
            sqlreq.input('DateEnd',SQL.NVarChar,DateStart);            
        }
        else{
            sqlreq.input('DateEnd',SQL.NVarChar,Bdy.DateEnd);
        }
        sqlreq.input('NikudType',SQL.Int,Bdy.NikudType);
        sqlreq.input('NikudValue',SQL.Int,Bdy.NikudValue);
        sqlreq.input('Machpil',SQL.Int,Bdy.Machpil);
        sqlreq.input('MathAction',SQL.Int,Bdy.MathAction);
        
        sqlreq.output('Success', SQL.Int)
        


         var data=await DB.ExecuteSP(sqlreq,"ECSM_NikudTableUpdate");
        console.log(data);

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