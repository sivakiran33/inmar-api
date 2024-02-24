const locationDao = require('../../dao/LocationDao');
const apiResponse = require('../../utils/apiResponse');

module.exports = async (req, res) => {

    let invalidMessage = isInvalid(req);
    
    if(invalidMessage != undefined) {
        apiResponse.fail(invalidMessage, res);
        return;
    }

    try {
        await locationDao.init();
        let locationId = req.params.location_id;
        let response = null;

        if (locationId) {
            let dataObj = await locationDao.getLocation(locationId);
            if (dataObj) response = dataObj.toJSON();
            else {
                apiResponse.success(null, res);
                return;
            }
        } else {
            let dataObj = await locationDao.getAllLocations();
            response = dataObj.map(loc => loc.toJSON());
        }

        apiResponse.success(response, res);
        return;
    } catch (error) {
        console.log(error);
        apiResponse.fail('Failed to get location', res);
        return;
    }

}

function isInvalid(req){}