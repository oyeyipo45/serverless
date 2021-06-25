'use strict';
// Import dependency.
const { MongoClient } = require('mongodb');
const secrets = require('../secrets.json');

const client = new MongoClient(secrets.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const clientPromise = client.connect();

// Handler
module.exports.connectToDatabase = async function (event, context) {
  // Get the MongoClient by calling await on the connection promise. Because
  // this is a promise, it will only resolve once.
  const client = await clientPromise;
  // Use the client to return the name of the connected database.

  // Log that  db is connected
  console.log(`MongoDB Connected: ${client.s.options.srvHost}`);
  return client.db().databaseName;
};
