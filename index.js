import { v4 as uuidv4 } from 'uuid';
import express from 'express';
const app = express();
app.use(express.json()); // for parsing application/json
app.set('json spaces', 2); // set number of spaces for indentation

let receipts = new Map(); // could change to hashmap?

// START SERVER
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// ENDPOINTS
// ping endpoint to test if server is running
app.get('/ping', (req, res) => {
  res.status(200).send("pong");
})

// Process a receipt
app.post('/receipts/process', (req, res) => {
    let uuid = uuidv4();
    let payload = req.body;
    console.log(payload);
    receipts.set(uuid, payload);
    
    let response = { "id" : uuid };
    res.status(201).json(response);
});

// Get points for a receipt