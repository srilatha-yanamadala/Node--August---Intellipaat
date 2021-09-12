var express = require('express');
var app = express();
var fs = require('fs');

//let heroes = ["Batman","Wonder Woman", "Superman", "Cyborg", "Flash"];
//let heroes = ["Batman"];

// ___________________

let rawData = null;
var heroes = null;

app.set("view engine", "pug");
app.use(express.urlencoded());
//custom middleware
app.use("/", function(req, res, next){
    if(req.url === '/favicon.ico'){
        console.log("Request for favicon was handled")
    }
    next();
})

app.get("/", function(req,res){

 rawData = fs.readFileSync("./data/heroes.json", "utf-8");
 heroes = JSON.parse(rawData).data;
    res.render("home", {
        "title": "My Company",
        "user" : "Deepthy",
        heroes : heroes
    })
})

app.post("/", function(req,res){
    console.log(req.body.newhero);

    heroes.push(req.body.newhero);
    let writeData= {
        "data" : heroes
    }
    fs.writeFileSync("./data/heroes.json",JSON.stringify(writeData));
    res.redirect("/");
    res.end();
})

app.listen(3030, "localhost", function(err){
    if(err){
        console.log("error", err)
    }else{
        console.log("server is live on port 3030")
    }
})