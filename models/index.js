const mongoose = require('mongoose');

require('./Car');

const conectionString = 'mongodb://localhost:27017/carbicle';

async function init() {
    try {
        await mongoose.connect(conectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database condected');

      
        mongoose.connection.on('error', (error) => {
            console.error('database error');
            console.error(error);
        });

    } catch (error) {
        console.error('Error conecting to database');
        process.exit(1);
    }

}

module.exports = init;