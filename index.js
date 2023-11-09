const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create an instance of Express
const app = express();

// Set up the Sequelize connection
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_DIALECT,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  }
);

console.log('env variable', process.env.PORT);

// Check the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Set up your routes and other middleware
// Example:
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
