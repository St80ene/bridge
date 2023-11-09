import { Sequelize } from 'sequelize';

export default class DatabaseDriver {
  private url: string;
  constructor(url = '') {
    this.url = url;
  }

  init(): Sequelize {
    const sequelize = new Sequelize(this.url);
    return sequelize;
  }
}

const database = new DatabaseDriver(process.env.DATABASE_URL);

export const db = database.init();
