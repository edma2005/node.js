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
    const con = await client.connect();
    const data = await con
    .db('first')
    .collection('orders')
    .insertMany([
      {product: 'toothbrush', total: 5.75, customer: 'John'},
      {product: 'guitar', total: 55.5, customer: 'Bob'},
      {product: 'milk', total: 2.85, customer: 'Susan'},
      {product: 'pizza', total: 18, customer: 'Peter'},
      {product: 'boots', total: 65.99, customer: 'Tomas'},
      {product: 'cats', total: 99.99, customer: 'Mike'}
    ]);
    // .count({product: 'tootbrush'})
    // .distinct('product')
      await con.close();
      res.send(data);
    } catch (error) {
        res.status(500).send({ error });
    }
    });

// app.get("/categories", async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con
//       .db("shop")
//       .collection("categories")
//       .aggregate([
//         {
//           $lookup: {
//             from: "products",
//             localField: "title",
//             foreignField: "category",
//             as: "products",
//           },
//         },
//         {
//           $project: {
//             category: "$title",
//             total: {
//               $sum: "$products.price",
//             },
//           },
//         },
//       ])
//       .toArray();
//     console.log(data);
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
    
app.listen(port, () => {
    console.log(`It works on 127.0.0.1:${port} port`);
  });