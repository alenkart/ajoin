module.exports = function (sequelize, DataTypes) {

    const Sound = sequelize.define("Sound", {
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

    return Sound;
}