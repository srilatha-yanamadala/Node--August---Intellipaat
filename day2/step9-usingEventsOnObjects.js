let EventEmitter = require('events').EventEmitter;

class HeroList extends EventEmitter{
    list = [];
    addHero(nhero){
        if(nhero){
            this.list.push(nhero);
        this.emit("heroadded", nhero)
        }else{
            console.log('You must add a new hero')
        }
    }
}

let herolist = new HeroList();
herolist.on("heroadded", function(evt){
console.log(evt);
})
herolist.addHero('Batman');
herolist.addHero();