const express = require('express');
const cors = require('cors');
const app = express();
var serveStatic = require('serve-static')


const { pool } = require('./db');

// const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(serveStatic(__dirname + '../build'));
app.use(express.json())
app.use(cors())


// Define your CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    optionsSuccessStatus: 200, // Return status code 200 for preflight OPTIONS requests
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
    credentials: true // Allow credentials like cookies and authorization headers
}

// Apply the CORS middleware to all routes
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


// Preflight OPTIONS handler for the submit-request endpoint
app.options('/submit-request', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');        
    res.sendStatus(200);
});

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
        const requestDate = new Date().toISOString();
        const environmentTypeDescription = `${tier}; ${service}`;
        
        await insertEnvironmentType(environmentTypeId, environmentType, environmentTypeDescription);
        await insertOwnership(environmentTypeId, subscriptionId, requestDate);
        await insertRequest(environmentTypeId, requestDate);
        
        res.status(200).send('Request submitted successfully!');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});

// Function to insert environment type into the database
async function insertEnvironmentType(environmentTypeId, environmentType, environmentTypeDescription) {
    const insertQuery = `
        INSERT INTO Environment_Types (EnvironmentType_ID, TypeName, Description)
        VALUES (?, ?, ?);
    `;
    await pool.request().query(insertQuery, [environmentTypeId, environmentType, environmentTypeDescription]);
}

// Function to insert ownership details into the database
async function insertOwnership(environmentTypeId, subscriptionId, ownershipStartDate) {
    const insertOwnershipQuery = `
        INSERT INTO Environment_Ownership (EnvironmentType_ID, Subscription_ID, OwnershipStartDate, IsActive)
        VALUES (?, ?, ?, 1);
    `;
    await pool.request().query(insertOwnershipQuery, [environmentTypeId, subscriptionId, ownershipStartDate]);
}

// Function to insert request details into the database
async function insertRequest(environmentTypeId, requestDate) {
    const requestId = generateUniqueRequestId();
    const insertRequestQuery = `
        INSERT INTO Request_Details (Request_ID, EnvironmentType_ID, RequestDate, ApprovalStatus)
        VALUES (?, ?, ?, 'pending');
    `;
    await pool.request().query(insertRequestQuery, [requestId, environmentTypeId, requestDate]);
}

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:5000`);
// });
