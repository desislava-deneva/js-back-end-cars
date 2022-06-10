const Accessory = require('../models/Accessory');
const models = require('../services/util')

async function getAll() {
  const data = await Accessory.find({});
  return data.map(models.accessoryViewModel);
}

async function createAccessory(accessory) {
  await Accessory.create(accessory);
}

module.exports = () => (req, res, next) => {
  req.accessory = {
    getAll,
    createAccessory
  };
  next();
}