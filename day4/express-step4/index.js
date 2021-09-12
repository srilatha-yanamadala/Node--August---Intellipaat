var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var morgan = require("morgan");
// --------------------------------------
// Configurations for express
var app = express();
// Route Configuration
var friendsRoutes = express.Router();
// --------------------------------------
// Middleware Configuration
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname+"/public"));
 
app.use(morgan('combined'));
app.use('/friends', friendsRoutes);
 
// --------------------------------------
// Database Configuration
// mongodb://127.0.0.1:27017/friendsdb
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let Friend = mongoose.model("Friend", new Schema({
    id : ObjectId, 
    name : String, 
    email : String, 
    city : String 
}));
 
var connectionString = "mongodb://127.0.0.1:27017/friendsdb";
mongoose.connect(connectionString, { useNewUrlParser : true, useUnifiedTopology : true})
.then(function(){ console.log("DB connection success")})
.catch(function(err){ console.log("Error : ", err)});
// --------------------------------------
 
// Create Read Udate Delete
// CREATE
friendsRoutes.route("/").post(function(req, res){
    console.log("recieved post request", req.body);
    let friend = new Friend(req.body);
    friend.save().then(function(){
        res.status(200).json({"added":"new friend added"})
    }).catch(function(err){
        res.send("your info was not saved to database")
    });
})
 
// READ
friendsRoutes.route("/").get(function(req, res){
    Friend.find(function(err, friendlist){
        if(err){ console.log("Error : ", err)}
        else{
            res.status(200).json(friendlist);
        }
    })
})
 
// REQUEST BEFORE UPDATE
friendsRoutes.route("/edit/:id").get(function(req, res){
    Friend.findById({ _id : req.params.id }, function(error, friendToEdit){
        if(error){ res.status(400).json({"error":error})}
        else{res.status(200).json(friendToEdit)}
    })
})
 
// UPDATE
friendsRoutes.route("/update/:id").post(function(req, res){
    Friend.findById({ _id : req.params.id }, function(error, friend){
        if(error){ res.status(400).json({"Error": error})}
        else{
            friend.name = req.body.name;
            friend.email = req.body.email;
            friend.city = req.body.city;
            friend.save().then(function(data){
                res.status(200).json(data);
            }).catch(function(err){
                res.status(400).send("friend's info was not updated")
            })
        }
    })
})
 
 
// DELETE
friendsRoutes.route("/delete/:id").delete(function(req, res){
    // console.log(req.params.id);
    Friend.findByIdAndDelete({ _id : req.params.id }, function(error, deletedFriend){
        if(error){
            res.status(400).json({"error ": error})
        }else{
            res.status(200).json({"delete_success": deletedFriend})
        }
    })
})
 
// --------------------------------------
// Web Configurations
app.listen(4040,"localhost",function(error){
    if(error){
        console.log("Error : ", error)
    }else{
        console.log("Server is now live on localhost:4040")
    }
});
// --------------------------------------
 