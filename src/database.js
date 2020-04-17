const { Sequelize, DataTypes } = require("sequelize");

const database = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

const User = database.define("User", {
  guildId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  audioUrl: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
});

database.sync();

module.exports = {
  User,
  database,
};
