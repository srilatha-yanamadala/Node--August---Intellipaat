let EventEmitter = require('events').EventEmitter;

let myEvent = new EventEmitter();


/* myEvent.addListener("onlineEvent", function(evt, msg){
    console.log("onlineEvent happened", evt.city, msg);
}) */

myEvent.on("onlineEvent", function(){
    console.log("onlineEvent happened");
})

/* setTimeout(function() {

    let evtObj = {
        message:  "My custom message", 
        power:6,
        city:"Gotham",
        type: "onlineEvent"
    }
    myEvent.emit("onlineEvent",evtObj, "hellooo");

},2000) */
let count = 0;
let si = setInterval(() => {
    if(count< 5){
        count++;

        myEvent.emit("onlineEvent");

    }else {
        clearInterval(si);
        console.log("Event stopped/ stopped listening to events")

    }
    
}, 2000);

