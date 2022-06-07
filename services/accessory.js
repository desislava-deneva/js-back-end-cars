const Accessory = require('../models/Accessory');

function mapToViewModel(accsesoty) {
  return {
    id: accsesoty._id,
    name: accsesoty.name,
    description: accsesoty.description,
    imageUrl: accsesoty.imageUrl || undefined,
    price: accsesoty.price,
  }
}

async function getAll() {
  // const data = await Accessory.find({});
  // return  data.map(mapToViewModel)

  return await Accessory.find({})
}

async function createAccessory(accessory) {
    await Accessory.create(accessory);
}

module.exports = () => (req, res, next) => {
    req.accessory = {
      createAccessory,
      getAll
    };
    next();
}