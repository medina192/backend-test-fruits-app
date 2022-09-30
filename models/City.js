const { Schema, model } = require('mongoose');

const CitySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
});

module.exports = model('City', CitySchema );