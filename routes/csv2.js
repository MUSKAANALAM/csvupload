var express= require("express");
var router= express.Router();
var units= require("../models/datas");
var mongoose=require("mongoose");
var csv= require("fast-csv");

//the home page
router.get("/", function(req, res){
   res.render("home"); 
});

 
//requires data and send it to database
router.post("/", function(req, res){
    if (!req.files)
            return res.status(400).send('No files were uploaded.');
            var csvFile = req.files.file;
     
        var data1 = [];
        csv
         .fromString(csvFile.data.toString(), {
             headers: true,
             ignoreEmpty: true
         })
         .on("data", function(data){
             data['_id'] = new mongoose.Types.ObjectId();
              
             data1.push(data);
         })
         .on("end", function(){
             units.create(data1, function(err, documents) {
                if (err) {throw err;}
                res.redirect("/upload");
             });
     
    });
});

//get all the records
router.get("/csv", function(req, res){
    units.find({},function(err, data){
        if(err){
            throw err;
        } else {
            res.render("csv",{units:data});
        }
    });
});




//Exporting to the app.js
module.exports =router;
