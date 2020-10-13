'use strict';
const db = require('./app/config/db');
const generateResponse = require('./app/utils/response');
const { formatBody } = require('./app/utils/helpers')
const { updateInventoryBySKU, getInventoryCountbySKU, all } = require('./app/controllers/inventory');


const getAllInventory = async (event) => {
  try {
    const response = await all();
    if (response.hasError)
      return generateResponse(response, 500);
    else
      return generateResponse(response);
  } catch (e) {
    return generateResponse(e, 500);
  }
};

const updateInventory = async (event) => {
  let { source, body } = formatBody(event);

  if (source !== "http") body = JSON.parse(body.Sns.Message);

  console.log('body: ', body);

  try {
    const response = await updateInventoryBySKU(body);
    if (response.hasError)
      return generateResponse(response, 500);
    else
      return generateResponse(response);
  } catch (e) {
    return generateResponse(e, 500);
  }
};

const getInventoryCount = async (event) => {
  try {
    const response = await getInventoryCountbySKU(
      event.pathParameters.sku
    );
    if (response.hasError)
      return generateResponse(response, 500);
    else
      return generateResponse(response);
  } catch (e) {
    return generateResponse(e, 500);
  }
};

module.exports = {
  updateInventory,
  getInventoryCount,
  getAllInventory
}
