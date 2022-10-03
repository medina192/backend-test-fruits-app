const { Schema, model } = require('mongoose');

const FruitSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

FruitSchema.method('toJSON', function() {
    const { __v, updatedAt, createdAt, ...object } = this.toObject();
    return object;
});

module.exports = model("Fruit", FruitSchema );