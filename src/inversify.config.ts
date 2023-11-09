import { Container } from 'inversify';
import { Sequelize } from 'sequelize';
import { db } from './db';
import TYPES from './constant/types';
import { UserService } from './service/user.service';
import { User, initUserModel } from './models/user.model';

const container = new Container();

// Inject services
container.bind<Sequelize>('Sequelize').toConstantValue(db);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<User>(TYPES.User).toDynamicValue((context) => {
  const sequelizeInstance = context.container.get<Sequelize>(TYPES.Sequelize);
  return initUserModel(sequelizeInstance) as unknown as User;
});

export { container };
