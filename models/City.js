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

CitySchema.method('toJSON', function() {
    const { __v,  updatedAt, createdAt, ...object } = this.toObject();
    return object;
});

module.exports = model("City", CitySchema );