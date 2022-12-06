const express = require('express');
const app = express();
const port = 3000;

// req - request - paduoda useris
// res - response - grazina kai kviecia
app.get("/", (req, res) => {
    res.send('Hello World!');
});