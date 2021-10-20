import {
  getConnectionManager,
  createConnections,
  Connection,
  ConnectionOptions,
} from "typeorm";

export abstract class IDatabase<T> {
  abstract devConnection(): Promise<void>;
  abstract proConnection(): Promise<void>;
  abstract getConnection(): Promise<T>;

  async connect() {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "production") {
      await this.proConnection();
    } else {
      await this.devConnection();
    }
  }
}

export class TypeOrmDatabase extends IDatabase<Connection> {
  connectionManager = getConnectionManager();
  options: Partial<ConnectionOptions> = {
    entities: ["*/entities/*.{js,ts}"],
  };

  async devConnection(): Promise<void> {
    await createConnections([
      {
        type: "sqlite",
        database: "db.sqlite3",
        logging: true,
        synchronize: true,
        entities: this.options.entities,
      },
    ]);
  }

  async proConnection() {
    await createConnections([
      {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: this.options.entities,
      },
    ]);
  }

  async getConnection() {
    return this.connectionManager.get();
  }
}
