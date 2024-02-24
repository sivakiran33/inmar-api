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
        let deleted = await locationDao.deleteLocation(req.params.location_id);

        deleted? apiResponse.success("Deleted", res)
        : apiResponse.fail('Failed to delete', res);
        return;
    } catch(error) {
        console.log(error);
        apiResponse.fail('Failed to delete location', res);
        return;
    }

}

function isInvalid(req){
    if(!req.params.location_id) return 'Invalid request - location_id is required in params';
}