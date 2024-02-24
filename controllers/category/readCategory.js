const categoryDao = require('../../dao/CategoryDao');
const apiResponse = require('../../utils/apiResponse');

module.exports = async(req, res) => {

    let invalidMessage = isInvalid(req);
    
    if(invalidMessage != undefined) {
        apiResponse.fail(invalidMessage, res);
        return;
    }

    try{
        await categoryDao.init();
        let [locationId, departmentId, categoryId] = [req.params.location_id, req.params.department_id, req.params.category_id];
        let response = null;

        if(categoryId){
            let dataObj = await categoryDao.getCategoryBy(locationId, departmentId, categoryId);
            response = dataObj.toJSON()
        } else {
            let dataObj = await categoryDao.getCategories(locationId, departmentId);
            response = dataObj.map(cat=>cat.toJSON());
        }
        
        apiResponse.success(response, res);
        return;
    } catch(error) {
        console.log(error);
        apiResponse.fail('Failed to get category', res);
        return;
    }

}

function isInvalid(req){
    if(!req.params.location_id) return 'Invalid request - location_id is required in params';
    if(!req.params.department_id) return 'Invalid request - department_id is required in params';
}