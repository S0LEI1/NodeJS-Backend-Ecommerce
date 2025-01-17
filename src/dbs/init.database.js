import mongoose from 'mongoose';
import { config } from '../configs/config.mongodb.js';
const env = process.env.NODE_ENV || 'dev';
const {
  db: { host, port, name },
} = config[env];
const connectString = `mongodb://${host}:${port}/${name}`;
export class Database {
  constructor() {
    this.connect();
  }
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => {
        console.log('Connect mongodb success');
        console.log(connectString);
      })
      .catch((err) => console.log('Error connect', err));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

export { instanceMongodb };
