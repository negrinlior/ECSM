//IMPORT
const express=require('express');
const bodyPareser=require('body-parser');
const cors=require('cors');
const SQL=require("mssql");

//Set Express server
const app=express();
app.use(bodyPareser.json());
app.use(cors());

//Midleware
    //File routs
    const GetsVersion=require('./Version/version.js');
    const postLogin=require('./routs/api/login');

    //Routh routing
    app.use('/',GetsVersion);
    app.use('/api/login',postLogin);


//Run server
const port=process.env.PORT || 5000;
app.listen(port, () => console.log('Server is started on port ' + port));