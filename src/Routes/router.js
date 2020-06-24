const express=require('express');
const router=express.Router();
const bcryptjs=require('bcryptjs');
const uuid = require('uuid');
const jwt= require("jsonwebtoken");
const db=require('../dbconfig/db');
 

const userMiddleware=require("../Middlewares/users.js");


router.post('/signup',userMiddleware.validateRegister,(req,res,next)=>{
 db.query(
     `SELECT * FROM trialdb WHERE LOWER(username)=LOWER(${db.escape(
         req.body.username
     )
    });`,

    (err,result)=>{
       if(result==req.body.username.length){
           return res.status(409).send({
              msg:'this username is already in use!'
           });
       } else{
           //username is available
           bcryptjs.hash(req.body.password,10,(err,hash)=>{
             if(err){
                 return res.status(500).send({
                   msg:'err'
                 });
             }
             else{
                 db.query(
                    `INSERT INTO trialdb(id,username,password,last_login)VALUES('${uuid.v4()}',${db.escape(
                        req.body.username
                    )}, ${db.escape(hash)},now())`,
                    (err,result)=>{
                        if(err){
                            throw err;
                            return res.status(404).send({
                               msg:err
                            });
                        }
                        return res.status(201).send({
                            msg:'registered!'
                        });
                    } 
                 );
             }

           });
       }
    }
 );
});

router.post('/login',(req,res,next)=>{
    db.query(
        `SELECT * FROM trialdb WHERE username = ${db.escape(req.body.username)};`,
        (err,result) =>{
            if(err){
                throw err;
                 return res.status(400).send({
                     msg:err
                 });
            }

            if(!result.length){
              return res.status(401).send({
                 msg:'username or password is incorrect!'
              });

            }
            //check password
            bcrypt.compare(
             req.body.password,
              result[0]['password'],
              (bErr,bResult) =>{
                  //wrong password
                  if(bErr){
                    throw bErr;
                      return res.status(401).send({
                          msg:'username or password is incorrect!'
                      });
            }
            

                if (bResult){
                    const token = jwt.sign({
                        username:result[0].username,
                        userId:result[0].id
                    },
                    'SECRETKEY',{
                        expiresIn:'7d'
                    }
                    
                    );
                    db.query(
                       `UPDATE trialdb SET last_login = now() WHERE id = '${result[0].id}'`
                    );
                     return res.status(200).send({
                        msg:'Logged in!',
                        token,
                        user:result[0]
                     });
                    }

                    return res.status(401).send({
                        msg:'username or password is incorrect!'
                    });

                }

            );
        }

    );
    
});


router.get('/secretroute',userMiddleware.isLoggedIn,(req,res,next)=>{
    res.send("only secret users can se this");

});



module.exports=router;