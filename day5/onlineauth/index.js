let express = require("express");
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let session = require("client-sessions");
 
let app = express();
app.use(express.urlencoded());
app.use(session({
    cookieName : "session",
    secret : "12cvbnmloiu7890plkjhgfdswe4567u8iknbvcderty7u8iokjvcxzswertyui",
    duration : 30 * 60 * 1000,
    activeDuration : 5 * 60 * 1000,
    ephemeral : false
}))
 
//-----------------------------------
// configuration for routes
 
/* let vjhash = bcrypt.hashSync("vijay", bcrypt.genSaltSync(10));
console.log("Hashed Value : ", vjhash); */
 
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
 
let User = mongoose.model("User", new Schema({
    id : ObjectId,
    firstName : String,
    lastName : String,
    email : { type : String, required : true, unique : true },
    password : String
}));
let url = "mongodb://localhost/onlineuserdb";
mongoose.connect(url).then(
    function(){console.log("Database is now connected")}, 
    function(err){console.log("Error :", err)})
 
 
app.get("/", function(req, res){
    res.render("index.pug");
})
app.get("/register", function(req, res){
    res.render("register.pug");
})
app.post("/register", function(req, res){
    let hast = bcrypt.hashSync( req.body.password, bcrypt.genSaltSync(10));
    let user = new User({
        firstName :  req.body.firstname,
        lastName :  req.body.lastname,
        email :  req.body.email,
        password :  hast
    });
    user.save(function(err){
        let tempError = '';
        if(err){
            if(err.code === 11000){
                tempError = "This eMail id is already registered with us";
            }else{
                tempError = "Registeration failed please try after some time";
            }
            res.render("register.pug",{
                error : tempError
            })
        }else{
            res.redirect("/profile")
        }
    })
})
app.get("/login", function(req, res){
    res.render("login.pug");
})
app.post("/login", function(req, res){
    User.findOne({ email : req.body.email }, function(error, user){
        if(!user){
            res.render("login.pug",{
                error : "No registered user by that credential"
            })
        }else{
            // if(req.body.password === user.password){
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.user = user;
                res.redirect("/profile");
            }else{
                res.render("login.pug",{
                    error : "Invalid eMail or password"
                })
            }
        }
    })
})
app.get("/profile", function(req, res){
    // res.render("profile.pug");
    if(req.session && req.session.user){
        User.findOne({ email : req.session.user.email }, function(error, user){
            if(!user){
                req.session.reset();
                res.redirect("/login");
            }else{
                res.render("profile.pug",{
                    user : user
                });
            }
        })
    }else{
        res.redirect("/login");
    }
})
app.get("/logout", function(req, res){
    req.session.reset();
    res.render("logout.pug");
})
 
//-----------------------------------
// configuration for web server
app.listen(5050);
console.log("server is now live on localhost:5050");
 