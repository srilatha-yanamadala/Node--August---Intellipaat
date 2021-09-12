let fs = require("fs");

/* fs.writeFileSync("temp.txt", "Welcome to your life");
console.log("file is created "); */

//fs.appendFileSync("temp.txt", " There is no turning back");

// let data = fs.readFileSync("temp.txt", "utf-8");
let existingFile = fs.readFileSync("temp.txt", "utf-8");
fs.writeFileSync("temp.txt", "Bread and butter"+ existingFile)

// console.log(data.toString());
// console.log(data + "");
// console.log(data);

console.log(fs.readFileSync("temp.txt", "utf-8"));


//prepend text 
let existingText = fs.readFileSync("temp.txt","utf8"); 
fs.writeFileSync("temp.txt","Bread & Breakfast : "+existingText); 
console.log(fs.readFileSync("temp.txt","utf8"));


