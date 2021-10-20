import { Sequelize } from "sequelize";
import { getConnectionManager, createConnections, Connection } from "typeorm";

export abstract class IDatabase<T> {
  abstract devConnection(): Promise<void>;
  abstract proConnection(): Promise<void>;
  abstract getConnection(): Promise<T>;

  async connect() {
    console.log(process.env.NODE_ENV );
    if (process.env.NODE_ENV === "production") {
      this.proConnection();
    } else {
      this.devConnection();
    }
  }
}

export class TypeOrmDatabase extends IDatabase<Connection> {
  connectionManager = getConnectionManager();

  async devConnection(): Promise<void> {
    await createConnections([
      {
        type: "sqlite",
        database: "db1.sqlite3",
        logging: false,
        synchronize: true,
        entities: ["*/entities/*.{js,ts}"],
      },
    ]);
  }

  async proConnection() {

    await createConnections([
      {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: ["src/entities/**/*.ts"],
      },
    ]);

    // const connection = this.connectionManager.create();
    // await connection.connect();
  }

  async getConnection() {
    return this.connectionManager.get();
  }
}

export class Database {
  sequelize = getConnection();

  async start() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}

function getConnection() {
  return process.env.NODE_ENV === "production" ? postgres() : sqllite();
}

function sqllite(): Sequelize {
  return new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite3",
  });
}

function postgres(): Sequelize {
  const config = {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };

  return new Sequelize(process.env.DATABASE_URL, config);
}
