const casual = require("casual");
const city = casual.city;
const firstName = casual.first_name;
const lastName = casual.last_name;

casual.define('point', function() {
    return {
        x: (Math.floor(Math.random() * 10 + 1)),
        y: (Math.floor(Math.random() * 10 + 1))
    };
});

const point = casual.point;

console.log(firstName);
console.log(lastName);
console.log(city);
console.log(point);


const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

console.log(randomNumber(1, 10));


const name = "Edmund";
const surname = "Jackovskij";
const fullName = name + " " + surname; // bad
const newFullName = `${name} ${surname}`; // good

console.log(fullName);
console.log(newFullName);

console.log(`${casual.name_prefix} ${casual.first_name} ${casual.last_name}`);