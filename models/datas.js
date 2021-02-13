var mongoose=require("mongoose");

// Creating schema
var updateSchema= new mongoose.Schema({

},{strict:false});

//Exporting update Schema
module.exports= mongoose.model("units", updateSchema);
