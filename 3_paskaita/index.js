// npm init
// nusikopinam dependencies ir tada npm install

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // is JSON i JS

// const JSON = {
//     "name": "Edma"
// };

// const js = {
//     name: "Edma"
// };

const cars = [
    {
        make: "AUDI",
        model: "A8 D3",
        color: "Silver",
        id: 1
    },
    {
        make: "BMW",
        model: "7 E65",
        color: "Black",
        id: 2
    },
];

app.get("/cars", (req, res) => {
    res.send(cars);
});

app.get("/cars/:id", (req, res) => {
    const id = +req.params.id;
    // const car = cars.find((car) => car.id === id) || {};
    const car = cars.find((car) => car.id === id);
    if (car) {
        res.send(car);
    } else {
        res.status(404).send({
            error: "Car not found"
        });
    }
});

app.post("/cars", (req, res) => {
    const car = req.body;
    if (car.make && car.model && car.color) {
    //   const newCar = { ...car, id: Date.now() };
      const newCar = {...car, id: cars.length + 1};
      cars.push(newCar);
      res.send(newCar);
    } else {
      res.status(400).send({
        error: "Invalid request",
      });    }
});

app.listen(port, () => {
    console.log(`Server is running on the 127.0.0.1:${port} port`);
});