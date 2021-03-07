import { Sequelize } from 'sequelize';

class Database {
	sequelize: Sequelize;

	constructor() {
		this.sequelize =
			process.env.NODE_ENV === 'production'
				? this.proConnection()
				: this.devConnection();
	}

	proConnection(): Sequelize {
		return new Sequelize(process.env.DATABASE_URL, {
			dialectOptions: {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
			},
		});
	}

	devConnection(): Sequelize {
		return new Sequelize({
			dialect: 'sqlite',
			storage: 'db.sqlite3',
		});
	}

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

export default Database;
