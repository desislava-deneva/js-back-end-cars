const { Schema, model, Types: { ObjectId } } = require('mongoose');
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
const accsesotyShema = new Schema({
    name: { type: String, required: true, minlength: [3, 'Name must be least 3 charecters long '] },
    description: { type: String, default: '', minlength: [10, 'Description must be least 10 charecters long'] },
    imageUrl: { type: String, default: 'noImage.jpg' },
    price: { type: Number, min: [1, 'Price must be mininum 1'] },
    owner: { type: ObjectId , ref: 'User'}
});


const Accessory = model('Accessory', accsesotyShema);

module.exports = Accessory; 