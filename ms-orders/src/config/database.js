const sql = require("mssql");
const { env } = require("./env");

const dbConfig = {
  server: env.sqlServer,
  database: env.sqlDatabase,
  user: env.sqlUser,
  password: env.sqlPassword,
  port: env.sqlPort,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

let pool;

async function initializeSqlDatabase() {
  pool = await sql.connect(dbConfig);
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Orders' AND xtype='U')
    CREATE TABLE Orders (
      id INT IDENTITY(1,1) PRIMARY KEY,
      customerName NVARCHAR(100) NOT NULL,
      destination NVARCHAR(255) NOT NULL,
      status NVARCHAR(50) NOT NULL
    )
  `);
}

function getSqlPool() {
  return pool;
}

module.exports = {
  initializeSqlDatabase,
  getSqlPool
};
