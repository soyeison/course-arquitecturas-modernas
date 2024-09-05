import { Schema, model, connect } from 'mongoose';

class MongoDatabase {
  constructor() {
    this._connect();
  }

  async _connect() {
    await connect('mongodb://localhost:27017/cqrs', {
      user: 'yeison',
      pass: 'admin123',
      authSource: 'admin',
    })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error');
      });
  }
}

const mongoDBInstance = new MongoDatabase();

export { mongoDBInstance };
