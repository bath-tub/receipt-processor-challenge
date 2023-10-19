import { v4 as uuidv4 } from 'uuid';
import express from 'express';
const app = express();
app.use(express.json()); // for parsing application/json

// START SERVER
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

app.set('json spaces', 2); // set number of spaces for indentation


let receipts = []; // could change to hashmap?

// ENDPOINTS

// ping pong
app.get('/ping', (req, res) => {
  res.status(200).send("pong");
})

// Create a new item
app.post('/receipts/process', (req, res) => {
    let myuuid = uuidv4();
    let receipt = { "id" : myuuid };
    receipts.push(receipt);

    res.status(201).json(receipt);
});
