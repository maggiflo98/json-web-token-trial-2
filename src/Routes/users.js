const express= require('express');
const router= express.Router();
const bcryptjs=require('bcryptjs');


router.get('/signup',function(req,res){
    res.render("signup")
});

router.post("/signup",function(req,res){

    var username=req.body.username;
    var email= req.body.email;
    var password1=req.body.password1;
    var password2 =req.body.password2;

    if(password1==password2){
        //using bcryptjs
        const saltRounds=10;

        bcryptjs.hash(password,10,function(err,hash){
        
    var query="INSERT INTO `trialdb`(`id`, `username`, `email`, `password`) VALUES NULL,'"+username+"','"+email+"','"+hash+"')";
          
      db.query("query",function(err,results){
          if(err){
          res.send("passwords did not match");
          }
          else
          {
              res.render('login');
          }

      })

      });

    }

});



module.exports=router;