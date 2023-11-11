import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import './controllers/user.controller';
import { container } from './inversify.config';

const PORT = process.env.PORT || 5000;

async function startServer() {
  const server = new InversifyExpressServer(container, null, {
    rootPath: '/api',
  });

  server.setConfig((app) => {
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());
  });

  const app = server.build();

  try {
    // Wait for the database to initialize
    // await container.get<Promise<any>>(TYPES.Sequelize);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();
