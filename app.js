var  express= require("express");
   app = express();
    bodyParser= require("body-parser");
    mongoose=require("mongoose");
    fileUpload= require("express-fileupload");
    methodOverride= require("method-override");

var csvRoutes=require("./routes/csv2");

// Connecting to the MongoDB database
mongoose.connect("mongodb://localhost/upload");
mongoose.Promise= global.Promise;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(fileUpload());


app.use("/upload", csvRoutes);

app.listen(3000, function(){
    console.log("Process Started!!");
});
