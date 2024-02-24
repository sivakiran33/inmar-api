const SkuModel = require('../db/models/Sku');

class SkuDao {
    async init() {
        this.Sku = await SkuModel();
        await this.Sku.sync();
    }

    // Get all skus
    async getAllSkus() {
        return await this.Sku.findAll();
    }

    // Insert bulk skus
    async insertBulkSkus(skuArray) {
        return await this.Sku.bulkCreate(skuArray);
    }

    // Get skus by
    async getSkusBy(properties) {
        return await this.Sku.findAll(
            { where: properties }
        )
    }
}

module.exports = new SkuDao();