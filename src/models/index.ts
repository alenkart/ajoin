import database from './database';
import createSound from './sound';

export const Sound = createSound(database.sequelize);
