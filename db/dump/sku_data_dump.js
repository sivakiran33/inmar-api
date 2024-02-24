const csv = require('csv-parser')
const fs = require('fs')
const skuDao = require('../../dao/SkuDao')

async function dumpData() {

    const skuArray = [];
    fs.createReadStream('sku_data.csv')
        .pipe(csv())
        .on('data', (data) => skuArray.push({
            sku: data.SKU,
            name: data.NAME,
            location: data.LOCATION,
            department: data.DEPARTMENT,
            category: data.CATEGORY,
            subcategory: data.SUBCATEGORY,
            active: true
        }))
        .on('end', async () => {
            await skuDao.init();
            skuDao.insertBulkSkus(skuArray);
        });
}

try{
    dumpData();
} catch(err){
    console.log(err);
}