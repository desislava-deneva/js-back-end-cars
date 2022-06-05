const mongoose = require('mongoose');

 const Car = require('./Car');

const conectionString = 'mongodb://localhost:27017/carbicle';

async function init() {
    try {
        await mongoose.connect(conectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });

        console.log('Data base conneted');

        //add car in database
    //   await  Car.create({
    //         "name": "Russian machine",
    //         "description": "Description Russian Machine",
    //         "imageUrl": "russian.jpg",
    //         "price": 99000
    //       })

        mongoose.connection.on('error', (err)=>{
            console.error('Database error');
            console.error(err);
        });

    } catch (error) {
        console.error('Error connection to database');
        process.exit(1);
    }
   
}

module.exports = init;