import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize';
import TYPES from '../constant/types';
import Config from '../config';
import logger from '../logger';

@injectable()
export default class DatabaseDriver {
  private url: string;
  private sequelize: Sequelize | null = null;
  private db: Sequelize | null = null;

  constructor(@inject(TYPES.Config) private config: Config) {
    this.url = config.getDatabaseURL();

    this.init().then((dbInstance) => {
      this.db = dbInstance;
    });
  }

  getDb() {
    return this.db;
  }

  async init(): Promise<Sequelize> {
    this.sequelize = new Sequelize(this.url);

    try {
      await this.sequelize.authenticate();
      logger.info(
        'DatabaseDriver: Connection to the database has been established successfully.'
      );
      return this.sequelize;
    } catch (error) {
      logger.error(
        // @ts-ignore
        `'DatabaseDriver: Unable to connect to the database:': ${error?.message}`,
        {
          // @ts-ignore
          stack: error?.stack,
        }
      );
      throw error;
    }
  }
}

export { default as database } from './factory';

// const database = new DatabaseDriver(process.env.DATABASE_URL);
// export const db = database.init();
// function inject(
//   Config: any
// ): (
//   target: typeof DatabaseDriver,
//   propertyKey: undefined,
//   parameterIndex: 0
// ) => void {
//   throw new Error('Function not implemented.');
// }
