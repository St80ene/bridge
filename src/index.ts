import express, { Request, Response } from 'express';
import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Create an instance of Express
const app = express();

// Set up the Sequelize connection
const dialect: Dialect = process.env.DATABASE_DIALECT as Dialect;
const sequelize = new Sequelize(
  process.env.DATABASE_NAME!,
  dialect,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST!,
    dialect,
  }
);

// Check the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });

// Set up your routes and other middleware
// Example:
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
