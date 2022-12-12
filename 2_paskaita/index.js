const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// const cars = ["BMW", "Porsche", "VW"];

// // req - request - paduoda useris
// // res - response - grazina kai kviecia
// app.get("/", (req, res) => {
//     // res.send('Hello World!');
//     res.send(cars);
// });

const names = [`Alex`, `Rose`, `Megan`];

app.get("/users/", (req, res) => {
    res.send(names);
});

app.get(`/users/:firstLetter`, (req, res) => {
    const firstLetter = req.params.firstLetter.toUpperCase();
    const filter = (names, firstLetter) => names.filter(user => user.startsWith(firstLetter));
    const result = filter(names, firstLetter);
    res.send(result);
});

app.post('/users/', (req, res) => {
    let newUser = req.body.name;
    names.push(newUser);
    console.log(names);
    res.send(names);
});

app.listen(port, () => {
    console.log(`Server is listening on localhost:${3000} port`);
});