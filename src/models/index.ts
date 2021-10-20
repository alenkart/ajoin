import { Database } from "@ajoin/core";
import { createSound } from "./Sound";
import { createSoundRanking } from "./SoundRanking";

const database = new Database();

const Sound = createSound(database.sequelize);
const SoundRanking = createSoundRanking(database.sequelize);

SoundRanking.belongsTo(Sound, { foreignKey: "soundId" });

// database.start();

export { Sound, SoundRanking };
