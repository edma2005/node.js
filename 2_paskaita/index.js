const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

const cars = ["BMW", "Porsche", "VW"];

// req - request - paduoda useris
// res - response - grazina kai kviecia
app.get("/", (req, res) => {
    // res.send('Hello World!');
    res.send(cars);
});

// const users = ["Alex", "Rose", "Megan"];

// // req - request - paduoda useris
// // res - response - grazina kai kviecia
// app.get("/", (req, res) => {
//     // res.send('Hello World!');
//     console.log(users);
//     res.send(users);
// });

app.listen(port, () => {
    console.log(`Server is running on the 127.0.0.1:${port} port`);
});