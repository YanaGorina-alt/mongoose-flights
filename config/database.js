// .env configuration
require('dotenv').config();
// Dependencies
const mongoose = require('mongoose');
const Tweet = require('./tweet');
const data = require('./data');

// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection Error/Success
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('open', () => console.log('mongo connected'));
db.on('close', () => console.log('mongo disconnected'));

module.exports = db;