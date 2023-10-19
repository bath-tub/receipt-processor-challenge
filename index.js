const express = require('express');
const app = express();
app.use(express.json()); // for parsing application/json

let receipts = []; // could change to hashmap?

// ENDPOINTS
// Create a new item
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    dataStore.push(newItem);
    res.status(201).send(newItem);
  });
  
// Ping endpoint
app.get('/api/ping', (req, res) => {
    res.status(200).send("pong");
})

// START SERVER
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });
