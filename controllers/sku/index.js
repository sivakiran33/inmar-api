const skuDao = require('../../dao/SkuDao');
const apiResponse = require('../../utils/apiResponse');

module.exports = async(req, res) => {

    let invalidMessage = isInvalid(req);
    
    if(invalidMessage != undefined) {
        apiResponse.fail(invalidMessage, res);
        return;
    }

    try{
        await skuDao.init();
        let skus = await skuDao.getSkusBy(req.body);
        apiResponse.success(skus, res);
        return;
    } catch(error) {
        apiResponse.fail('Failed to get locations', res);
        return;
    }

}

function isInvalid(req){
    if(!req.body) return 'Invalid request - body is required';
}