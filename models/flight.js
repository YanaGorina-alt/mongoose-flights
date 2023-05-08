const { Schema, model } = require('mongoose');
// Destructing Schema and model from mongoose and setting them to their own vars
const Destination = require('./destination');
// create a new Schema
// This will define the shape of the documents in the collection
let date = new Date();


const flightSchema = new Schema(
  
  {
    airline: {type:String, enum: ['American', 'Southwest', 'United']},
    flightNo: {type:Number, min:10, max: 9999},
    departs: {
      type:Date,
      default: new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())}, 
    airport: {type:String, enum: ['AUS', 'DAL','LAX', 'SAN', 'SEA'], default: 'SAN'},
    destinations: [{ type: Schema.Types.ObjectId , ref: "Destination"}]
  },
  {
    timestamps: true,
  }
);


const Flight = model('Flight', flightSchema);

//make this exportable to be accessed in `server.js`
module.exports = Flight;