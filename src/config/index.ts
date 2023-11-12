import { inject, injectable } from 'inversify';

@injectable()
class Config {
  private config: { [key: string]: any };

  constructor() {
    const { env } = process;

    this.config = { env };
    return this;
  }

  getDatabaseURL(): string {
    return this.config.env.DATABASE_URL;
  }
}

export default Config;
