const bcrypt = require('bcrypt');

function accessoryViewModel(accessory) {
  return {
    id: accessory._id,
    name: accessory.name,
    description: accessory.description,
    imageUrl: accessory.imageUrl || undefined,
    price: accessory.price,
    owner: accessory.owner
  }
}
function carViewModel(car) {
  const model = {
    id: car._id,
    name: car.name,
    description: car.description,
    imageUrl: car.imageUrl,
    price: car.price,
    accessories: car.accessories,
    owner: car.owner
  };
  if (model.accessories.length > 0 && model.accessories[0].name) {
    model.accessories = model.accessories.map(accessoryViewModel)
  }
  return model;
}



async function hashedPassword(password) {
  return await bcrypt.hash(password, 10);

}

async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword)
}

function isLoggedIn() {
  return function (req, res, next) {
    if (req.session.user) {
      next()
    } else {
      res.redirect('/login')
    }
  }
}

module.exports = {
  accessoryViewModel,
  carViewModel,
  hashedPassword,
  comparePassword,
  isLoggedIn
}