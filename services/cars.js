const Car = require('../models/Car');

function carViewModel(car) {
    console.log();
    return {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        accessories: car.accessories
    };
}

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
    const currCar = Car.findById(id)
    currCar.name = car.name
    currCar.imageUrl = car.imageUrl || undefined
    currCar.description = car.description
    currCar.price = car.price
    currCar.accessories = car.accessories

    await currCar.save();
}

async function attachAccessories(carId, accessoryId) {
    const currCar = await Car.findById(carId);
    currCar.accessories.push(accessoryId);
    console.log(currCar);

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