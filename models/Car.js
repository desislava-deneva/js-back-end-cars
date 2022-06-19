const { Schema, model, Types: { ObjectId } } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true, minlength:[3, 'Name must be least 3 charecters logn'] },
    description: { type: String, default: '', minlength:[10, 'Description must be least 3 charecters logn'] },
    imageUrl: { type: String, default: 'noImage.jpg' },
    price: { type: Number, required: true, min: [1, 'Price must be least by 1'] },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory', minlength:[3, 'Accessory must be least 3 charecters logn'] },
    owner: { type: ObjectId, ref: 'User' }
});

const Car = model('Car', carSchema);

module.exports = Car;