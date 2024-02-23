const sql = require('mssql');

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