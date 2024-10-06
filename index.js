const path = require("path");
const express = require("express");
const multer = require("multer"); // it is used to upload the file in node js

const app = express();
const PORT = 8002;

// this disk storage engines give you full control on storing files to disk;
const storage = multer.diskStorage({
    destination:function(req,file,cb){ // cb is the call back 
        return cb(null,"./uploads") // here null means there is no error of chance if possible thenn you make own custom arrays to handle it,// file name :- upload
    },
    filename:function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({storage}); 

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false})); // urlencoded parse the form data which coming from user side not for json data.. 

app.get("/",(req,res)=>{
    return res.render("homepage");
});

app.post("/upload",upload.single("profileImage"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
});

app.listen(PORT,()=>console.log(`Server started at the port:${PORT}`));