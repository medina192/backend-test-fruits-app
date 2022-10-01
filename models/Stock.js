const { Schema, model } = require('mongoose');

const StockSchema = Schema({
    stock: {
        type: Number,
        required: true
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: "City",
        required: true
    },
    fruitId: {
        type: Schema.Types.ObjectId,
        ref: "Fruit",
        required: true
    },
},{
    timestamps: true
});

module.exports = model("Stock", StockSchema );