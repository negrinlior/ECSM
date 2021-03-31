const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('<H1>ECS Server is runing</H1><BR>Version: 2.1.202104');
});

module.exports=router;