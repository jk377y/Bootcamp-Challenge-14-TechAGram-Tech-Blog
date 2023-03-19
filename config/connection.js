// This file is used to connect to the database using Sequelize and dotenv packages	to hide the database credentials.
// require('dotenv').config();
// const Sequelize = require('sequelize');
// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//       host: 'localhost',
//       dialect: 'mysql',
//       dialectOptions: {
//         decimalNumbers: true,
//       },
//     });

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        // host: '127.0.0.1',
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
    );
}

module.exports = sequelize;