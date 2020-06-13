//Express
const express=require('express');
const router=express.Router();

//DB
const DB=require('../DB');
const config = require('../../config');
const SQL=require("mssql");

//Uploads
const Multer=require('multer');
const storage = Multer.diskStorage({ //How to store
                                        destination: function(req, file, cb) {
                                        cb(null, './uploads/');
                                        },
                                        filename: function(req, file, cb) {
                                        cb(null, file.originalname);
                                        }
                                    });
const fileFilter = (req, file, cb) => { //FilteroutFiles
                                        // Accept only xlsx,csv,txt
                                        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                                            || file.mimetype === 'application/vnd.ms-excel'
                                            || file.mimetype === 'text/plain') {
                                          cb(null, true);
                                        } else {
                                          cb('Unsupported Format', false);
                                        }
                                      };
const Upload=Multer({
                        storage: storage,
                        limits: { //5 MB - size is in bits
                        fileSize: 1024 * 1024 * 5
                        },
                        fileFilter: fileFilter
                    });


// ********************     API     ******************************************************

router.post('/UploadBdikot',Upload.single('file1'),async function(req,res){
    try{
        var fs = require('fs');
        // SRc,DST,ERROR   -   destination.txt will be created or overwritten by default.
        await fs.copyFile(req.file.path, config.BdikotFilePTH, (err) => {
            if (err) throw err;
        });
        
        //Delete SRC file
        fs.unlinkSync(req.file.path);

        //RUN SP
        var sqlreq= new SQL.Request();
        sqlreq.input('FilePTH',SQL.NVarChar,'C');
        sqlreq.output('SuccessOutput', SQL.Int)
        
        var data=await DB.ExecuteSP(sqlreq,"BdikotLoad");
        if (data.output.SuccessOutput=1){
            res.send({Success:1,Reason:'Execute Success'});
        }
        else
        {
            res.send(JSON.stringify({Success:-1,Reason:'Execute Fail'}));
        }

    }catch(err){
        console.log(err);
        res.send(JSON.stringify({Success:-1,Reason:'Connection Fail'}));
    }   
});

router.post('/UploadTarichiHariga',Upload.single('file1'),async function(req,res){
    try{
        var fs = require('fs');
        // SRc,DST,ERROR   -   destination.txt will be created or overwritten by default.
        await fs.copyFile(req.file.path, config.TarichHarigaFilePTH, (err) => {
            if (err) throw err;
        });
        
        //Delete SRC file
        fs.unlinkSync(req.file.path);

        //RUN SP
        var sqlreq= new SQL.Request();
        sqlreq.input('FilePTH',SQL.NVarChar,'C'); //אין משמעות לנתיב
        sqlreq.output('SuccessOutput', SQL.Int)
        
        var data=await DB.ExecuteSP(sqlreq,"DateHarigaLoad");
        if (data.output.SuccessOutput=1){
            res.send({Success:1,Reason:'Execute Success'});
        }
        else
        {
            res.send(JSON.stringify({Success:-1,Reason:'Execute Fail'}));
        }

    }catch(err){
        console.log(err);
        res.send(JSON.stringify({Success:-1,Reason:'Connection Fail'}));
    }   
});

module.exports=router;