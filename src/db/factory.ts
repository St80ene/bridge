import { interfaces } from 'inversify';
import DatabaseDriver from '.';
import Config from '../config';
import TYPES from '../constant/types';

export default async (context: interfaces.Context): Promise<DatabaseDriver> => {
  return new Promise<DatabaseDriver>(async (resolve) => {
    const config = await context.container.get<Config>(TYPES.Config);
    const db = new DatabaseDriver(config);
    await db.init();
    resolve(db);
  });
};
