const express = require('express');
const cors = require('cors');
const { pool } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

var whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Middleware to parse JSON bodies
app.use(cors(corsOptions));
app.use(express.json())
app.use(cors())



   app.get('/api/data', (req, res) => {
    // Assuming you want to send back some JSON data
    const responseData = {
      message: 'This is a test endpoint',
      data: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
      ]
    };
  
    // Sending the JSON response
    res.json(responseData);
  });



function generateUniqueEnvironmentTypeId() {
    return environmentTypeIdCounter++;
}

function generateUniqueRequestId() {
    return requestIdCounter++;
}

// Define the /submit-request endpoint
app.post('/submit-request', async (req, res) => {
    try {
        const requestData = req.body;
        const { environmentType, tier, service, subscriptionId } = requestData;
        
        const environmentTypeId = generateUniqueEnvironmentTypeId();
        
        await insertRequest(environmentTypeId, subscriptionId, tier, service);
        
        res.status(200).send('Request submitted successfully!');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});

// Preflight OPTIONS handler for the submit-request endpoint
app.options('/submit-request', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');        
    res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:5000`);
});

