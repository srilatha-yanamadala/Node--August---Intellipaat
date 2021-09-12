let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let morgan = require('morgan');

//-------------------------
//Configuration for express

var app = express();
var friendsRoutes = express.Router();
//-------------------------
//Configuration for Middleware

app.use(express.json());
app.use(cors);
app.use(morgan('combined'));

//-------------------------
//Configuration for Db
//mongodb://127.0.0.1:27017/friendsdb

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let Friend = mongoose.model("Friend", new Schema({
    _id : ObjectId, 
    name : String, 
    email : String, 
    city : String 
}))
var connextionString = "mongodb://127.0.0.1:27017/friendsdb";
mongoose.connect(connextionString).then(function(){
    console.log("Db connection was succcessful" )
}).catch(function(err){
    console.log("Db connection was not succcessful", err)
});

//-------------------------
//Configuration for Route



//Create

friendsRoutes.route("/").get(function(req,res){
    Friend.find(function(err, friendlist){
        if(err){
            console.log("Error :",err)
        }else{
          res.status(200).json(friendlist);
        }
    })
})
//-------------------------
//Configuration for Web
app.listen(4040, "localhost", function(err){
    if(err){
        console.log("error",err)
    }else{
        console.log("Listening to port 4040")
    }
});
//-------------------------