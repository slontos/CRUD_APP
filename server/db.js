const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "Spiros2610!",
    host: "localhost",
    port: 5432,
    database: "demo"
});

module.exports = pool;