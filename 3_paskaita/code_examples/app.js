const express = require('express');
const { USERS, CARS_ADVERTS } = require('./database/db.js');

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());

// *** Routes ***
// **************

// - USERS
// -------
// -- POST     /api/users                              | sign up (creates user)
app.post('/api/users', (req, res) => {
  const user = req.body; // receiving name and surname
  user.userId = USERS.length + 1;

  USERS.push(user);

  res.send({
    message: 'User is regsitered',
    user,
  }); // sending back new users data
});

// -- POST     /api/users/login                        | logs in (validates user)
app.post('/api/users/login', (req, res) => {
  const userId = +req.body.id;

  const user = USERS.find((user) => user.userId === userId);

  if (!user)
    res.status(403).send({ message: "User with given ID doesn't exist." });

  res.send({
    message: 'User is logged in',
    user,
  }); // sending back new users data
});

// -- GET      /api/users                              | shows all users data
app.get('/api/users', (req, res) => res.send(USERS));

// -- GET      /api/users/:id                          | shows single user data (in real world we would probobly use JWT or other secure patern)
app.get('/api/users/:id', (req, res) => {
  const id = +req.params.id;

  const user = USERS.find((user) => user.userId === id);

  if (!user)
    res.status(404).send({ message: "User with given ID doesn't exist." });

  res.send(user);
});

// -- PUT      /api/users/:id                          | updates single user data
app.put('/api/users/:id', (req, res) => {
  const id = +req.params.id;
  const newData = req.body;

  const user = USERS.find((user) => user.userId === id);

  if (!user)
    res.status(404).send({ message: "User with given ID doesn't exist." });

  const updatedUser = { ...user, ...newData };

  const index = USERS.indexOf(user);
  USERS.splice(index, 1, updatedUser);

  res.send({
    message: 'User updated',
    user: updatedUser,
  });
});

// -- DELETE   /api/users/:id                          | deletes single user data
app.delete('/api/users/:id', (req, res) => {
  const id = +req.params.id;

  const user = USERS.find((user) => user.userId === id);

  if (!user)
    res.status(404).send({ message: "User with given ID doesn't exist." });

  const index = USERS.indexOf(user);
  USERS.splice(index, 1);

  res.send({ message: 'User deleted' });
});

// - CARS ADVERTS
// --------------
// -- POST     /api/cars                               | creates single car adverts
app.post('/api/cars', (req, res) => {
  const data = req.body;

  const user = USERS.find((user) => user.userId === data.userId);

  if (!user)
    res.status(403).send({
      message: "User with given ID doesn't exist. Car was not added.",
    });

  CARS_ADVERTS.push({ ...data, carId: CARS_ADVERTS.length + 1 });

  res.send({ message: 'Car added' });
});

// -- GET      /api/cars                               | guest/account: gets all cars adverts
app.get('/api/cars', (req, res) => res.send(CARS_ADVERTS));

// -- GET      /api/cars/:ownerid                      | guest/account: gets all cars for single owner
app.get('/api/cars/:ownerid', (req, res) => {
  const ownerId = +req.params.ownerid;

  const cars = CARS_ADVERTS.filter((car) => car.userId === ownerId);

  res.send(cars);
});

// -- GET      /api/cars/car/:carid                    | guest/account: gets single car for single user
app.get('/api/cars/car/:carid', (req, res) => {
  const carId = +req.params.carid;

  const car = CARS_ADVERTS.find((car) => car.carId === carId);

  if (!car)
    res.status(404).send({ message: 'Car with given ID does not exist.' });

  res.send(car);
});

// -- GET      /api/cars/account/:accountid            | account: gets all account cars
app.get('/api/cars/account/:accountid', (req, res) => {
  const accountId = +req.params.accountid;

  const cars = CARS_ADVERTS.filter((car) => car.userId === accountId);

  res.send(cars);
});

// -- GET      /api/cars/account/:accountid/:carid     | account: gets single account car
app.get('/api/cars/account/:accountid/:carid', (req, res) => {
  const accountId = +req.params.accountid;
  const carId = +req.params.carid;

  const car = CARS_ADVERTS.find(
    (car) => car.userId === accountId && car.carId === carId
  );

  if (!car)
    res
      .status(404)
      .send({ message: 'Car or User with given ID does not exist.' });

  res.send(car);
});

// -- PUT      /api/cars/account/:accountid/:carid     | account: gets single car and updates it's information
app.put('/api/cars/account/:accountid/:carid', (req, res) => {
  const accountId = +req.params.accountid;
  const carId = +req.params.carid;
  const newData = req.body.make;

  const car = CARS_ADVERTS.find(
    (car) => car.userId === accountId && car.carId === carId
  );

  if (!car)
    res
      .status(404)
      .send({ message: 'Car or User with given ID does not exist.' });

  const updatedCar = { ...car, make: newData };

  const index = CARS_ADVERTS.indexOf(car);
  CARS_ADVERTS.splice(index, 1, updatedCar);

  res.send({
    message: 'Car updated',
    car: updatedCar,
  });
});

// -- DELETE   /api/cars/account/:accountid/:carid     | account: gets single car and deletes it
app.delete('/api/cars/account/:accountid/:carid', (req, res) => {
  const accountId = +req.params.accountid;
  const carId = +req.params.carid;

  const car = CARS_ADVERTS.find(
    (car) => car.userId === accountId && car.carId === carId
  );

  if (!car)
    res
      .status(404)
      .send({ message: 'Car or User with given ID does not exist.' });

  const index = CARS_ADVERTS.indexOf(car);
  CARS_ADVERTS.splice(index, 1);

  res.send({ message: 'Car deleted' });
});

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
