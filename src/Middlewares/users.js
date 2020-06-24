module.exports={
    validateRegister:(req,res,next)=>{
        if(!req.body.username || req.body.username.length <3){
            return res.status(404).send({
                msg:'please enter a username with a min of 3 charachters'
            });
        }

        if(!req.body.password || req.body.password.length < 6){
              return res.status(404).send({
                msg:"please enter a password min. 6 chars"
              });

        }
         if(!req.body.password_repeat || req.body.password!=req.body.password_repeat){
             return res.status(404).send({
                 msg:"both passwords must match"
             });
         }
         next()

    },
    isLoggedIn:(req,res,next)=>{
        try{
            const token=req.authorization.headers.split('')[1];
            const decoded=jwt.verify(
                token,
                'SECRET KEY'
            );
            req.userData=decoded;
            next()
        }catch(err){}
            return res.status(401).send({
                msg:'your session is not valid'
            });
    }
    };
