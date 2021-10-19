import { Model, Sequelize, DataTypes } from "sequelize";

export class Sound extends Model {
  static async findByGuildId(guildId: string, soundId?: string) {
    let where: Record<string, any> = { guildId };

    if (soundId) {
      where.soundId = soundId;
    }

    const sounds = await this.findAll({
      where,
      order: ["soundId"],
      raw: true,
    });

    return sounds;
  }

  static async replace(fields: {
    guildId: string;
    soundId: string;
    url: string;
    author: string;
  }) {
    await this.destroy({
      where: { guildId: fields.guildId, soundId: fields.soundId },
    });

    await this.create(fields);
  }
}

export const createSound = (sequelize: Sequelize) => {
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
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  Sound.init(attributes, {
    sequelize,
  });

  return Sound;
};
