const { Schema, model} = require('mongoose');

const destinationSchema = new Schema({
    airport:  { type: String, enum: ['AUS', 'DAL','LAX', 'SAN', 'SEA'], required: true },
    arrival:  { type: Date, required: true },

});

const Destination = model('Destination', destinationSchema);

module.exports = Destination;