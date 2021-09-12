let express = require("express");
let app = express();
 
app
.get("/", function(req, res){
    res.render("home.pug",{
        title : "My Application",
        user: "Deepthy"
    });
})
.get("/about", function(req, res){
    res.send("hello from about page");
})
 
app.listen(2020,"localhost", function(err){
    if(err){
        console.log("Error : ", err);
    }else{
        console.log("Web Server is now live on localhost:2020");
    }
})