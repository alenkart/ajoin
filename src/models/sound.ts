import { Model, Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
	class Sound extends Model {}

	const config = {
		guildId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		soundId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		soundUrl: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	Sound.init(config, { sequelize });

	return Sound;
};
