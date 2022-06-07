const { Schema, model } = require('mongoose');

const accsesotyShema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: 'noImage.jpg'  },
    price: { type: Number, min: 0 }
});


const Accsessory = model('Accsessory', accsesotyShema);

module.exports = Accsessory;