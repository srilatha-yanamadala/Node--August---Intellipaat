let fetch = require("fetch");
let fs = require("fs");
 
function fetchThatUrl(url, filename){
    fetch.fetchUrl(url,function(error, meta, response){
        if(error){
            console.log("Error : ", error);
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
        }else{
            if(fs.existsSync("temp")){
                fs.writeFileSync("temp/"+filename,response.toString());
            }else{
                fs.mkdirSync("temp");
                fs.writeFileSync("temp/"+filename,response.toString());
            }
        }
    });
}
 
module.exports = { fetchThatUrl }