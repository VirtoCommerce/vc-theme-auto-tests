export default {

lists:[
{
name1: 'Cypress_test',
description1: 'Cypress_test. My personal list. '
},
{
name2: 'Cypress_test2',
description2: 'Cypress_test. My personal list. '
}

],

getRandomNumber(){

const randomNumber = Math.floor(Math.random() * 100);
return randomNumber;

},

getRandomWord() {
const words =  [
    "New Year's Day",
    "Valentine's Day",
    "Easter Sunday",
    "Independence Day",
    "Halloween",
    "Thanksgiving Day",
    "Christmas Day",
    "Labor Day",
    "Memorial Day",
    "Veterans Day",
    "Martin Luther King",
    "Presidents' Day",
    "Good Friday",
    "Hanukkah",
    "Diwali"
];

const randomIndex = Math.floor(Math.random() * words.length);
return words[randomIndex];
}
}