import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import './controllers/user.controller';
import { container } from './inversify.config';

const PORT = process.env.PORT || 5000;

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

let app = server.build();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
