const subcategoryDao = require('../../dao/SubcategoryDao');
const apiResponse = require('../../utils/apiResponse');

module.exports = async(req, res) => {

    let invalidMessage = isInvalid(req);
    
    if(invalidMessage != undefined) {
        apiResponse.fail(invalidMessage, res);
        return;
    }

    try{
        await subcategoryDao.init();
        let [locationId, departmentId, categoryId, subcategoryId] 
        = [req.params.location_id, req.params.department_id, req.params.category_id, req.params.subcategory_id];
        let response = null;

        if(subcategoryId){
            let dataObj = await subcategoryDao.getSubcategoryBy(locationId, departmentId, categoryId, subcategoryId);
            response = dataObj.toJSON()
        } else {
            let dataObj = await subcategoryDao.getSubcategories(locationId, departmentId, categoryId);
            response = dataObj.map(subcat=>subcat.toJSON());
        }
        
        apiResponse.success(response, res);
        return;
    } catch(error) {
        console.log(error);
        apiResponse.fail('Failed to get subcategory', res);
        return;
    }

}

function isInvalid(req){
    if(!req.params.location_id) return 'Invalid request - location_id is required in params';
    if(!req.params.department_id) return 'Invalid request - department_id is required in params';
    if(!req.params.category_id) return 'Invalid request - category_id is required in params';
}