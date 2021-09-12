var express = require("express");
var app = express();
app.get("/",function(req, res){
    // res.send("hello express !!!");
    res.sendFile(__dirname+"/public/index.html");
});
app.get("/about",function(req, res){
    res.sendFile(__dirname+"/public/about.html");
});
app.get("/products",function(req, res){
    res.sendFile(__dirname+"/public/products.html");
});
app.get("/contact",function(req, res){
    res.sendFile(__dirname+"/public/contact.html");
});
app.get("*",function(req, res){
    res.sendFile(__dirname+"/public/404.html");
});
app.listen(5050,"localhost",function(error){
    if(error){ 
        console.log("Error : ", error)
    }else{
        console.log("server is now live on localhost:5050")
    }
})