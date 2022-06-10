const Car = require('../models/Car');

const models = require('../services/util')


async function getAll(query) {
    const options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }

    if (query.from) {
        options.price = { $gte: Number(query.from) };
    }

    if (query.to) {
        if (!oprions.price) {
            oprions.price = {};
        }
        oprions.price.$lte = Number(query.to);
    }

    const cars = await Car.find(options);
    return cars.map(models.carViewModel);
}

async function getById(id) {
    const car = await Car.findById(id).populate('accessories');

    if (car) {
        return models.carViewModel(car)
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
    const existing = await Car.findById(id)
    existing.name = car.name
    existing.imageUrl = car.imageUrl || undefined
    existing.description = car.description
    existing.price = car.price
    existing.accessories = car.accessories

    await existing.save();
}

async function attachAccessories(carId, accessoryId) {
    const currCar = await Car.findById(carId);
    currCar.accessories.push(accessoryId);

    await currCar.save();
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        updateById, 
        attachAccessories
    };
    next();
}