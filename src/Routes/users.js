const express= require('express');
const router= express.Router();
var db=require("../dbconfig/db")
const bcryptjs=require('bcryptjs');


router.get('/signup',function(req,res){
    res.send("create an account with us")
});

router.post("/signup",function(req,res){

    var username=req.body.username;
    var email= req.body.email;
    var password=req.body.password;
    var confirmPassword=req.body.password;

    if(password==password){
        //using bcryptjs
        const saltRounds=10;

        bcryptjs.hash(password,10,function(err,hash){
        
    var sql="INSERT INTO `trialdb`(`id`, `username`, `email`, `password`) VALUES (NULL,'"+username+"','"+email+"','"+hash+"')";
          
      db.query(sql,function(err,results){
          if(err){
          //res.send("passwords did not match")
          throw err;
          }
          else
          {
              res.send('welcome to login');
          }

      })

      });

    }

});



module.exports=router;