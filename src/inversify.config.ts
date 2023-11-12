import { Container } from 'inversify';
import { Sequelize } from 'sequelize';
import TYPES from './constant/types';
import { UserService } from './service/user.service';
import { User, initUserModel } from './db/models/user.model';
import DatabaseDriver, { database } from './db'; // Import the DatabaseDriver class
import Config from './config';
import { UserController } from './controllers/user.controller';

const container = new Container();

// Bind DatabaseDriver as a constant value
container
  .bind<DatabaseDriver>(TYPES.DatabaseDriver)
  .toDynamicValue(database)
  .inSingletonScope();

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<User>(TYPES.User).toDynamicValue((context) => {
  // const db = context.container.get<DatabaseDriver>(TYPES.DatabaseDriver);
  // console.log('=====> ', db.getDb());

  // return initUserModel(db.getDb()!) as unknown as User;
  return User as unknown as User;
});
container.bind<Config>(TYPES.Config).toDynamicValue((context) => {
  return new Config();
});

// Resolve the service
container.resolve<DatabaseDriver>(DatabaseDriver);

export { container };
