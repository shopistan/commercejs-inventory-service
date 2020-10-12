const { Inventory } = require('../../models');
const generateResponse = require('../../utils/response');

const getInventoryCountbySKU = async (sku) => {
  try {
    const inventory = await Inventory.findOne({ sku }).select('quantity');
    const response = { count: inventory ? inventory.quantity : 0 };
    return {
      hasError: false,
      response
    };
  } catch (e) {
    return {
      hasError: true,
      response: e
    };
  }  
};

const updateInventoryBySKU = async ({items}) => {
  try {
    const response =  await Promise.all(items.map(async item => {
      let response = await update(item)
      return { item, response };
    }));
    return {
      hasError: false,
      response
    }
  } catch (e) {
    return {
      hasError: true,
      response: e
    }
  }
};

const all = async () => {
  try{
    const response = await Inventory.find({});
    return {
      hasError: false,
      response
    };
  } catch (e) {
    return {
      hasError: true,
      response: e
    }
  }
};

const createInventory = async ({ sku, quantity }) => {
  return await Inventory.create({ sku, quantity });
};

const getInventory = async (sku) => {
  return await Inventory.findOne({ sku });
};

const update = async ({sku, quantity}) => {
  let inventory = await getInventory(sku);
  let response = {};
  if (!inventory) {
    response = await createInventory({ sku, quantity });
  } else {
    response = await Inventory.findByIdAndUpdate(
      inventory._id,
      {
        sku: inventory.sku,
        quantity: inventory.quantity + quantity,
      },
      { new: true }
    );
  }
  return response
};

module.exports = {
  getInventoryCountbySKU,
  updateInventoryBySKU,
  all
};
