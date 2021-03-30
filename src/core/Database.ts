import { Sequelize } from "sequelize";

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
