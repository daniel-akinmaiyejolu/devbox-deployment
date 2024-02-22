const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require ('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));


const dbConfig = {
    user: '4dm1n157r470r',
    password: 'p455w.rd',
    server: 'inspire-sql-server.database.windows.net',
    port: 1433,
    database: 'inspire-database',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

function generateUniqueEnvironmentTypeId() {
    return environmentTypeIdCounter++;
}

function generateUniqueRequestId() {
    return requestIdCounter++;
}

// Define the /submit-request endpoint
app.post('/submit-request', async (req, res) => {
    const requestData = req.body;

    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        const environmentTypeId = generateUniqueEnvironmentTypeId();
        const requestDate = new Date().toISOString();
        const environmentTypeDescription = `${requestData.tier}; ${requestData.service}`;

        const insertQuery = `
            INSERT INTO Environment_Types (EnvironmentType_ID, TypeName, Description)
            VALUES (${environmentTypeId}, '${requestData.environmentType}', '${environmentTypeDescription}');
        `;

        await pool.request().query(insertQuery);

        const subscriptionId = requestData.subscriptionId;
        const ownershipStartDate = requestDate;

        const insertOwnershipQuery = `
            INSERT INTO Environment_Ownership (EnvironmentType_ID, Subscription_ID, OwnershipStartDate, IsActive)
            VALUES (${environmentTypeId}, '${subscriptionId}', '${ownershipStartDate}', 1);
        `;

        await pool.request().query(insertOwnershipQuery);

        const requestId = generateUniqueRequestId(); 

        const insertRequestQuery = `
            INSERT INTO Request_Details (Request_ID, EnvironmentType_ID, RequestDate, ApprovalStatus)
            VALUES (${requestId}, ${environmentTypeId}, '${requestDate}', 'pending');
        `;

        await pool.request().query(insertRequestQuery);

        // Respond with success message
        res.status(200).send('Request submitted successfully!');
    } catch (error) {
        console.error('Error submitting request:', error.message);
        res.status(500).send('An error occurred while processing the request.');
    }
});

// Start the server
app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
});
