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
    const FKeysListsAPI=require('./routs/api/FKeysLists');
    const FileUploadAPI=require('./routs/api/FileUpload');
    const postLogin=require('./routs/api/login');
    const UsersAPI=require('./routs/api/UserList');
    const HaktzaatBdikotAPI=require('./routs/api/HaktzaatBdikot');
    const BdikotAPI=require('./routs/api/Bdikot');
    const NetuniEzerAPI=require('./routs/api/NetuniEzer');
    const NikudAPI=require('./routs/api/Nikud');
    const TarichiBdikaAPI=require('./routs/api/TarichiBdika');
    const NihulShlavimToClientAPI=require('./routs/api/NihulShlavimToClient');
    const TarichiCharigaAPI=require('./routs/api/TarichiChariga');
    
    //Routh routing
    app.use('/',GetsVersion);
    app.use('/api/FKeysLists',FKeysListsAPI);
    app.use('/api/FileUpload',FileUploadAPI);
    app.use('/api/login',postLogin);
    app.use('/api/UsersAPI',UsersAPI);
    app.use('/api/HaktzaatBdikotAPI',HaktzaatBdikotAPI);
    app.use('/api/BdikotAPI',BdikotAPI);
    app.use('/api/NetuniEzerAPI',NetuniEzerAPI);
    app.use('/api/NikudAPI',NikudAPI);
    app.use('/api/TarichiBdikaAPI',TarichiBdikaAPI);
    app.use('/api/NihulShlavimToClientAPI',NihulShlavimToClientAPI);
    app.use('/api/TarichiCharigaAPI',TarichiCharigaAPI);
    


//Run server
const port=process.env.PORT || 5000;
app.listen(port, () => console.log('Server is started on port ' + port));