import { Model, Sequelize, DataTypes } from 'sequelize';

class Sound extends Model {
	static async fetchBy(guildId: string, soundId?: string) {
		let where = { guildId };

		if (soundId) {
			where['soundId'] = soundId;
		}

		const sounds = await this.findAll({
			where,
			order: ['soundId'],
			raw: true,
		});

		return sounds;
	}
}

export default (sequelize: Sequelize) => {
	const config = {
		guildId: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		soundId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	Sound.init(config, { sequelize });

	return Sound;
};
