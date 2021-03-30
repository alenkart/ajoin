import { Model, Sequelize, DataTypes, Op } from "sequelize";
import { Sound } from "./";

function createAtRange() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  var start = new Date(year, month, 1);
  var end = new Date(year, month + 1, 0);

  return {
    [Op.gte]: start,
    [Op.lte]: end,
  };
}

export class SoundRanking extends Model {
  static async findBySoundId(soundId: number) {
    const result = await this.findOne({
      where: {
        soundId,
        createdAt: createAtRange(),
      },
    });

    return result;
  }

  static async findTop(top: number = 5) {
    const result = await this.findAll({
      raw: true,
      nest: true,
      limit: top,
      order: [["counter", "desc"]],
      where: {
        createdAt: createAtRange(),
      },
      include: {
        model: Sound,
      },
    });

    return result;
  }

  static async getMonthlyRanking(soundId?: number) {
    const ranking = await this.findOne({
      where: {
        soundId,
        createdAt: createAtRange(),
      },
    });

    return ranking;
  }

  static async incrementRanking(soundId: number) {
    const result = await this.findBySoundId(soundId);

    if (result) {
      await result.increment({ counter: 1 });
      return;
    }

    await this.create({ soundId });
  }
}

export const createSoundRanking = (sequelize: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    counter: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  };

  SoundRanking.init(attributes, {
    sequelize,
  });

  return SoundRanking;
};
