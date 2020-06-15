const express =require('express');
const bodyParser=require("body-parser");
const hbs=require("express-handlebars");
const bcryptjs=require("bcryptjs");
const Path= require("path");
const userRoutes= require('./Routes/users');


const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/user",userRoutes,)


//view engine

// app.set('view engine',"hbs");
// app.engine('hbs',hbs({layoutsDir:__dirname + "/views/layouts",extname:"hbs"}));

// // app.use(express.static(__dirname +"/public"));



app.get('/',function(req,res){
   res.render('index');
})


    





















module.exports=app;