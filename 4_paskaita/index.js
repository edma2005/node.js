require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient} = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const con = await client.connect(); // prisijungimas prie bazes
        const data = await con.db('first').collection("pets").find().toArray(); // duomenu istraukimas
        await con.close(); // prisijungimo isjungimas
        res.send(data);
    } catch (error) {
        res.status(500).send({ error });
    }
});


// app.get('/:type', async (req, res) => {
//     const { type } = req.query;
//     try {
//       const con = await client.connect();
//       const data = await con
//         .db('first')
//         .collection('pets')
//         .find({type: "dog"})
//         // .find({type: "cat"})
//         // .find({type: "carrot"})
//         .toArray();
//       await con.close();
//       res.send(data);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });

app.post('/', async (req, res) => {
    try {
        const con = await client.connect();
        const data = await con
        .db('first').collection("pets")
        .insertOne({name: 'Musia', type: 'cat', age: '2'}); // pridejimas
        await con.close();
        res.send(data);
    } catch (error) {
        res.status(500).send({ error });
    }
});


// app.get('/', async (req, res) => {
//     try {
//         const con = await client.connect(); // prisijungimas prie bazes
//         const data = await con.db('first').collection("cars").find().toArray(); // duomenu istraukimas
//         await con.close(); // prisijungimo isjungimas
//         res.send(data);
//     } catch (error) {
//         res.status(500).send({ error });
//     }
// });

// app.post('/', async (req, res) => {
//     try {
//         const con = await client.connect();
//         const data = await con.db('first').collection("cars").insertOne({brand: 'VW', model: 'Passat'}); // pridejimas
//         await con.close();
//         res.send(data);
//     } catch (error) {
//         res.status(500).send({ error });
//     }
// });

app.listen(port, () => {
    console.log(`It works on 127.0.0.1:${port} port`);
  });


//   const data = await con.db('first').collection('cars').findOne(ObjectId(id));
//   app.get('/', async (req, res) => {
//     const { brand } = req.query;
//     try {
//       const con = await client.connect();
//       const data = await con
//         .db('first')
//         .collection('cars')
//         .find(brand ? { brand } : {})
//         .toArray();
//       await con.close();
//       res.send(data);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });

//   app.get('/', async (req, res) => {
//     const { brand, sort, property } = req.query;
//     try {
//       const con = await client.connect();
//       const data = await con
//         .db('first')
//         .collection('cars')
//         .find(brand ? { brand } : {})
//         .sort(sort ? { [property]: sort === 'asc' ? 1 : -1 } : {})
//         .toArray();
//       await con.close();
//       res.send(data);
//     } catch (error) {
//       res.status(500).send(error);
  
//     }
//   });

// // localhost:3000/?sort=desc&property=brand