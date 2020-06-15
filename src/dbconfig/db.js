var mysql=require("mysql");
var connection=mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"",
   name:"trialdb"

});



module.exports=connection;