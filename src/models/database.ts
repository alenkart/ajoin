import { Sequelize } from 'sequelize';

class Database {
	sequelize: Sequelize;

	private connect() {
		if (process.env.NODE_ENV === 'production') {
			this.sequelize = new Sequelize(process.env.DATABASE_URL);
			return;
		}

		this.sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: 'database.sqlite3',
		});
	}

	private async authenticate() {
		try {
			await this.sequelize.authenticate();
		} catch (error) {
			console.log(error);
			process.exit(1);
		}
	}

	async start() {
		this.connect();
		await this.authenticate();
	}
}

const database = new Database();
database.start();

export default database;
