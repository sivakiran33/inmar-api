const locationDao = require('../../dao/LocationDao');
const apiResponse = require('../../utils/apiResponse');

module.exports = async(req, res) => {

    let invalidMessage = isInvalid(req);
    
    if(invalidMessage != undefined) {
        apiResponse.fail(invalidMessage, res);
        return;
    }

    try{
        await locationDao.init();
        let dataObj = await locationDao.insertLocation(req.body);
        let response = dataObj.toJSON();
        
        apiResponse.success(response, res);
        return;
    } catch(error) {
        console.log(error);
        apiResponse.fail('Failed to create location', res);
        return;
    }

}

function isInvalid(req){
    if(!req.body) return 'Invalid request - body is required';
    if(!req.body.name) return 'Invalid request - name is required in body';
    if(!req.body.code) return 'Invalid request - code is required in body';
}