const { Sequelize, DataTypes } = require("sequelize");

const database = new Sequelize(process.env.DATABASE_URL);

const Sound = database.define("Sound", {
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
});

database.sync();

module.exports = {
  Sound,
  database,
};
