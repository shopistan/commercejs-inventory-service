const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));
const faker = require('faker');
const { updateInventoryBySKU, getInventoryCountbySKU, all } = require('./index');
const testHelper = require('../../utils/test.helper');

beforeEach(testHelper.setupTest);

describe('Inventory', () => {
  const randomSku = faker.random.uuid();
  
  describe('Update Inventory', () => {
    it('should have error = false', async () => {
      const body = { 
        items: [
          {
            sku: randomSku,
            quantity: faker.random.number({
              min: -50,
              max: 50,
            }),
          }
        ]
      }
      const result = await updateInventoryBySKU(body);
      expect(result.hasError).to.equal(false);
    });
  });
  describe('Count Inventory', () => {
    it('should have error = false', async () => {
      const result = await getInventoryCountbySKU(randomSku);
      expect(result.hasError).to.equal(false);
    });
  });
  describe('Get all Inventory', () => {
    it('should have error = false', async () => {
      const result = await all();
      expect(result.hasError).to.equal(false);
    });
  });
});
