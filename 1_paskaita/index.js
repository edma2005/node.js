const casual = require("casual");
const city = casual.city;
casual.define('point', function() {
    return {
        x: Math.random() * 10 + 1,
        y: Math.random() * 10 + 1
    };
});
const point = casual.point;

console.log(city);
console.log(point);