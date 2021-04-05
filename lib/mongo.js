const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }

          console.log('Connection succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  getAll(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  }

  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({
        _id: ObjectId(id),
      });
    });
  }
  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).updateOne(
          {
            _id: ObjectId(id),
          },
          {
            $set: data,
          },
          {
            upsert: true,
          }
        );
      })
      .then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({
          _id: ObjectId(id),
        });
      })
      .then(() => id);
  }

  filterEvents(collection, event) {
    let query = {};
    return this.connect().then((db) => {
      if (event.location) {
        query = {
          ...query,
          $text: {
            $search: event.location,
            $caseSensitive: false,
          },
        };
      }
      if (event.name) {
        let name = event.name;
        query = {
          ...query,
          name: {
            $in: [new RegExp(name)],
          },
        };
      }
      return db.collection(collection).find(query).toArray();
    });
  }

  getEventsRecents(collection) {
    return this.connect().then((db) => {
      const today = Date.now();
      return db
        .collection(collection)
        .find({
          createdAt: { $lte: today },
        })
        .toArray();
    });
  }
}

module.exports = MongoLib;