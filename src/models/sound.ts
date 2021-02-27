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
	const attributes = {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		guildId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		soundId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const options = {
		sequelize,
		indexes: [
			{
				name: 'guild_sound_url',
				fields: ['guildId', 'soundId', 'url'],
				unique: true,
			},
		],
	};

	Sound.init(attributes, options);

	return Sound;
};
