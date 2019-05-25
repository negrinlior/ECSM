const express=require('express');
const DB=require('../DB');

const router=express.Router();

router.get('/',(req,res)=>{
    res.send('Hello you need to sing in first'  );
});


router.post('/signin',(req,res)=>{
   
    DB.CommitSelectAndReturnRecordset((data)=>{
        console.log(data);
      
        res.write(JSON.stringify(data));
        res.end();
       }
       );   
});

module.exports=router;