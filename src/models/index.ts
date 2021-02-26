import Database from '../core/Database';
import createSound from './sound';

const database = new Database();

const Sound = createSound(database.sequelize);

database.start();

export { Sound };
