let EventEmitter = require('events').EventEmitter;

let myEvent = new EventEmitter();

function onlineEventHandler(evt){
    console.log('online event happened',evt)
}

process.nextTick(function (){
    myEvent.emit("onlineevent"); 
})

process.nextTick(function (){
    myEvent.emit("onlineevent",1); 
})

process.nextTick(function (){
    myEvent.emit("onlineevent",2); 
})
//myEvent.emit("onlineevent");
myEvent.on("onlineevent", onlineEventHandler);
console.log('Last line is called');