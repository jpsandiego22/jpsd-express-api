
const { Pool } = require('pg');

// Set up PostgreSQL connection using Pool
const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    // ssl: {
    //   rejectUnauthorized: false,  // This is necessary for connecting to Render’s PostgreSQL instance
    // }
  });

// const db = new Client({
//   connectionString: 'postgresql://jpsd:q6zKqM28YpTHiQWe5975KEA1chxZxscj@dpg-cvl5d52dbo4c73d7j9sg-a.singapore-postgres.render.com/express_api_blku', // Connection string from Render
//   ssl: {
//     rejectUnauthorized: false,  // Required to connect to Render's database
//   }
// });

module.exports = db;
