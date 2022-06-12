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

async function deleteById(id, ownerId) {
    const existing = await Car.findById(id);

    if (existing.owner != ownerId) {
        return false;
    } 

    await Car.findByIdAndDelete(id);

    return true
}

async function updateById(id, car, ownerId) {
    const existing = await Car.findById(id);

    if (existing.owner != ownerId) {
        return false;
    } 

    existing.name = car.name;
    existing.description = car.description;
    existing.imageUrl = car.imageUrl;
    existing.price = car.price;
    existing.accessories = car.accessories;

    await existing.save();
    
    return true;
}



async function attachAccessories(carId, accessoryId, ownerId) {
    const currCar = await Car.findById(carId);
    if (currCar.owner != ownerId) {
        return false;
    } 
    currCar.accessories.push(accessoryId);

    await currCar.save();

    return true;

}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        updateById,
        attachAccessories,
    };
    next();
}