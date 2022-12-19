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

// app.get('/', async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con
//     .db('first')
//     .collection('orders')
//     .insertMany([
//       {product: 'toothbrush', total: 4.75, customer: 'Mike'},
//       {product: 'guitar', total: 4.75, customer: 'Mike'},
//       {product: 'milk', total: 4.75, customer: 'Mike'},
//       {product: 'pizza', total: 4.75, customer: 'Mike'},
//       {product: 'boots', total: 4.75, customer: 'Mike'},
//       {product: 'cats', total: 4.75, customer: 'Mike'}
//     ]);
//       await con.close();
//       res.send(data);
//     } catch (error) {
//         res.status(500).send({ error });
//     }
//     });

app.listen(port, () => {
    console.log(`It works on 127.0.0.1:${port} port`);
  });