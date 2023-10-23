import { v4 as uuidv4 } from 'uuid';
import express from 'express';
const app = express();
app.use(express.json()); // for parsing application/json
app.set('json spaces', 2); // set number of spaces for indentation

let receipts = new Map();

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
    const uuid = uuidv4();
    const payload = req.body;
    if (payload) { // validate has payload and is JSON
      receipts.set(uuid, payload);
      try {
        calculatePoints(payload);
      } catch (error) {
        res.status(400).send('The receipt is invalid');
      }
      res.status(201).json({ "id" : uuid});
    } else {
      res.status(400).send('The receipt is invalid');
    }
});

// Get points for a receipt
app.get('/receipts/:id/points', (req, res) => {
  const receiptId = req.params.id
  const receipt = receipts.get(receiptId);
  if (receipt) {
    const points = receipt.points;
    res.status(200).json({ "points" : points });
  } else {
    res.status(404).send('No receipt found for that id');
  }
});

function calculatePoints(receipt) {
  let points = 0;
  points += countAlphaNumeric(receipt.retailer);

  if (receipt.total % 1 === 0) { // if no remainder when divided by 1 then no cents 
    points += 50;
  }

  if (receipt.total % 0.25 === 0) { // if no remainder when divided by 0.25 then multiple of 0.25
    points += 25;
  }

  points += Math.floor(receipt.items.length / 2) * 5; // every two items add 5 points

  receipt.items.forEach(item => {
    if (item.shortDescription.trim().length % 3 === 0) { // divisible by 3, multiply price by 0.2 and round up
      points += Math.ceil(item.price * 0.2);
    }
  });

  const date = new Date(receipt.purchaseDate);
  if (date.getUTCDate() % 2 === 1) { // day is odd
    points += 6;
  }

  const time = parseTime(receipt.purchaseTime);
  if (time > 14 && time < 16) { // between 1400 and 1600 hours
    points += 10;
  }

  receipt.points = points;
}

function countAlphaNumeric(retailer) {
  let count = 0;
  for (let i = 0; i < retailer.length; i++) {
    if (retailer[i].match(/[a-z0-9]/i)) {
      count++;
    }
  }
  return count;
}

function parseTime(time) {
  const hours = parseInt(time.split(':')[0]);
  const minutes = parseInt(time.split(':')[1]);
  return hours + (minutes / 60);
}