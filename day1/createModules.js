var firstname = 'Deepthy';
var lastname = 'Pillai';

function fullname(fn, ln){
    return fn + ln;
};
console.log(fullname(firstname, lastname));

// Multi line comment: alt+ctrl+a

module.exports = {
    fname: firstname,
    lname: lastname,
    fullname: fullname
}