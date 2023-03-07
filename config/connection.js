// This file is used to connect to the database
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {  // If the app is deployed to Heroku, use the JAWSDB_URL environment variable to connect to the database. Otherwise, use the local database connection.
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {  // Local database connection
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;  // Export the connection for use in other files