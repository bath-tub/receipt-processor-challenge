# Installation for Receipt Processing Program

This project uses docker to run the program. Please ensure you have that installed from the official docker website[https://www.docker.com/products/docker-desktop].
1. Clone this repo
2. Change directory into the repo
3. run `docker build -t receipt-processing .`
4. run `docker run -p 3000:3000 receipt-processing`
5. The server will be running on localhost:3000, please see the documentation below for the endpoints and example cURL commands.

# Documentation for Receipt Processing API

This documentation provides an overview of the Receipt Processing API, which is a RESTful API built using Node.js and Express. The API allows users to submit receipts and receive points based on certain criteria. 

## Endpoints

The API has two endpoints:

### 1. `/ping`

This endpoint is used to test if the server is running. It returns a `200 OK` response with the message "pong".

### 2. `/receipts`

This endpoint has two sub-endpoints:

#### a. `/receipts/process`

This endpoint is used to submit a receipt for processing. It accepts a JSON payload with the following fields:

- `retailer`: The name of the retailer where the purchase was made.
- `total`: The total amount of the purchase.
- `items`: An array of items purchased, each with the following fields:
  - `shortDescription`: A short description of the item.
  - `price`: The price of the item.
- `purchaseDate`: The date of the purchase in `YYYY-MM-DD` format.
- `purchaseTime`: The time of the purchase in `HH:MM` format.

If the payload is valid, the API will calculate the number of points earned for the receipt and return a `201 Created` response with the ID of the receipt. If the payload is invalid, the API will return a `400 Bad Request` response with the message "The receipt is invalid".

#### b. `/receipts/:id/points`

This endpoint is used to retrieve the number of points earned for a receipt. It accepts the ID of the receipt as a parameter and returns a JSON payload with the following field:

- `points`: The number of points earned for the receipt.

If the receipt ID is valid, the API will return a `200 OK` response with the JSON payload. If the receipt ID is invalid, the API will return a `404 Not Found` response with the message "No receipt found for that id".

## Gotchas

The following are some gotchas I ran into when developing this program:

1. The receipt is invalid not just invalid JSON.
2. Date and time can be tricky to handle.
3. Retailer name can contain more than just letters and numbers.

## Dependencies

The API uses the following dependencies:

- `uuid`: A library for generating UUIDs.
- `express`: A web framework for Node.js.

## Running the API

To run the API, follow these steps:

1. Install Node.js and npm.
2. Clone the repository.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the server.

The server will start listening on port 3000 by default.

## Testing the API

cURL for processing a receipt:
```
curl --location 'localhost:3000/receipts/process' \
--header 'Content-Type: application/json' \
--data '{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}'
```

After processing a receipt, take the UUID and replace in the following cURL to get points for a receipt:
```
curl --location 'localhost:3000/receipts/UUID_GOES_HERE/points'
```