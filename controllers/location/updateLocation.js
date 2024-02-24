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
        let updatedLocation = req.body;
        updatedLocation.id = req.params.location_id;

        let dataObj = await locationDao.updateLocation(updatedLocation);
        let response = dataObj.toJSON();
        
        apiResponse.success(response, res);
        return;
    } catch(error) {
        console.log(error);
        apiResponse.fail('Failed to update location', res);
        return;
    }
    
}

function isInvalid(req){
    if(!req.params.location_id) return 'Invalid request - location_id is required in params';
    if(!req.body) return 'Invalid request - body is required';
}