const sql = require('mssql');
 
const dbConfig = {
    user: 'azureuser',
    password: 'Pa55w.rd123',
    server: 'pipelineinspiresql2.database.windows.net',
    port: 1433,
    database: 'pipelineinspiredb2',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}
 
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();
 
poolConnect.then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});
 
module.exports = {
    pool,
};