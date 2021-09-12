var http = require("http");
var fs = require("fs");
 
var server = http.createServer(function(req, res){
   // console.log("Incoming request parameter", req.url);
   var file = req.url === "/" ? 'index.html' : req.url+".html";
   fs.readFile("public/"+file, "utf-8",function(error, data){
       if(data){
           res.writeHead(200, {
               "Content-Type" : "text/html"
           })
           res.end(data);
        }else{
           res.writeHead(404,  {
            "Content-Type" : "text/html"
        })
           res.end(fs.readFileSync("public/404.html", "utf-8"));
       }
   })
});
 
server.listen(5050,"localhost", function(err){
    if(err){
        console.log("Error : ", err);
    }else{
        console.log("Server is now live on localhost:5050")
    }
})