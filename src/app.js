const express =require('express');
const bodyParser=require("body-parser");
const cors=require("cors");
// const bcryptjs=require("bcryptjs");
// const Path= require("path");



const app=express();

app.use(bodyParser.json());
app.use(cors());

const router=require('./Routes/router.js');

app.use('/api',router); 

// app.use("/users",userRoutes,)






app.get('/',function(req,res){
   res.send('hello');
})


    





















module.exports=app;