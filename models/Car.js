const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String  },
    price: { type: Number, required: true, min: 0 }
});

const Car = model('Car', carSchema);

module.exports = Car;