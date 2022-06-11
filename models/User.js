const { Schema, model, Types: { ObjectId } } = require('mongoose');
const { comparePassword, hashedPassword } = require('../services/util')

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 3 },
    hashedPassword: { type: String, required: true, minlength: 6 }
});

userSchema.methods.comparePassword = async function (password) {
    return await comparePassword(password, this.hashedPassword);
};
userSchema.pre('save', async function (next) {

   if( this.isModified('hashedPassword')){
       console.log('hashing new password');
       this.hashedPassword = await hashedPassword(this.hashedPassword)
   }

    next()
});

const User = model('User', userSchema);

module.exports = User;