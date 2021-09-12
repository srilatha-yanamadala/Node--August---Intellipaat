let http = require('http');
let fs = require("fs");
let server = http.createServer(function(req, res){
    //res.write("Hello HTTP module");

    let htmlPage = fs.readFileSync("index.html", "utf-8");
    res.write(htmlPage);
    res.end();
})

server.listen(5050, "localhost", function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Server is available on port 5050" )
  
    }
})