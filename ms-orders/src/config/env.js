require("dotenv").config();

const normalizedSqlServer = (process.env.SQL_SERVER || "")
  .replace(/^tcp:/i, "")
  .trim();

const env = {
  port: process.env.PORT || 4002,
  sqlServer: normalizedSqlServer,
  sqlDatabase: process.env.SQL_DATABASE,
  sqlUser: process.env.SQL_USER,
  sqlPassword: process.env.SQL_PASSWORD,
  sqlPort: Number(process.env.SQL_PORT || 1433)
};

module.exports = { env };
