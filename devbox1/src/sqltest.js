const sql = require('mssql');

const config = {
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

console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        // Establish connection
        const poolConnection = await sql.connect(config);

        // Query data from User_Details table
        console.log("Reading rows from the User_Details Table...");
        let resultSet = await poolConnection.request().query(`SELECT * FROM User_Details`);
        console.log(`${resultSet.recordset.length} rows returned from User_Details Table.`);

        // Output User_Details table data
        resultSet.recordset.forEach(row => {
            console.log("User Details:", row);
        });

        // Query data from Request_Details table
        console.log("Reading rows from the Request_Details Table...");
        resultSet = await poolConnection.request().query(`SELECT * FROM Request_Details`);
        console.log(`${resultSet.recordset.length} rows returned from Request_Details Table.`);

        // Output Request_Details table data
        resultSet.recordset.forEach(row => {
            console.log("Request Details:", row);
        });

        // Query data from Environment_Ownership table
        console.log("Reading rows from the Environment_Ownership Table...");
        resultSet = await poolConnection.request().query(`SELECT * FROM Environment_Ownership`);
        console.log(`${resultSet.recordset.length} rows returned from Environment_Ownership Table.`);

        // Output Environment_Ownership table data
        resultSet.recordset.forEach(row => {
            console.log("Environment Ownership Details:", row);
        });

        // Query data from Environment_Types table
        console.log("Reading rows from the Environment_Types Table...");
        resultSet = await poolConnection.request().query(`SELECT * FROM Environment_Types`);
        console.log(`${resultSet.recordset.length} rows returned from Environment_Types Table.`);

        // Output Environment_Types table data
        resultSet.recordset.forEach(row => {
            console.log("Environment Type Details:", row);
        });

        // Close connection
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}