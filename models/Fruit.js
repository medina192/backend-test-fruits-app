const { Schema, model } = require('mongoose');

const FruitSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
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

module.exports = model("Fruit", FruitSchema );