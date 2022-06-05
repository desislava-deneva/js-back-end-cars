const Car = require('../models/Car');

function carViewModel(car) {
    console.log();
    return {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
    };
}

async function getAll(query) {
    const options = {};

    if (query.search) {
        options.name  = new RegExp(query.search, 'i');
    }

    if (query.from) {
        options.price = {$gte : Number(query.from)};
    }

    if (query.to) {
        if(!oprions.price){
            oprions.price = {};
        }
    oprions.price.$lte = Number(query.to);
    }

    console.log(options);

    const cars = await Car.find(options);
    return cars.map(carViewModel);
}

async function getById(id) {
    const car = await Car.findById(id);

    if (car) {
        return carViewModel(car)
    } else {
        return undefined;
    }
}

async function createCar(car) {
    const result = new Car(car);
    await result.save();

}

async function deleteById(id) {
    await Car.findByIdAndDelete(id)
}

async function updateById(id, car) {
    await Car.findOneAndReplace(id, car);
}

function nextId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16))
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        updateById
    };
    next();
}