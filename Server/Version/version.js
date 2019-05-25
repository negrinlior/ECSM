const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('<H1>ECS Server is runing</H1><BR>Version: 1.0.201906');
});

module.exports=router;