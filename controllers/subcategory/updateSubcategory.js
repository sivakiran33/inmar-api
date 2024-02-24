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
        
        let updatedSubcategory = req.body;
        updatedSubcategory.location_id = locationId;
        updatedSubcategory.department_id = departmentId;
        updatedSubcategory.category_id = categoryId;
        updatedSubcategory.id = subcategoryId;

        let dataObj = await subcategoryDao.updateSubcategory(updatedSubcategory);
        let response = dataObj.toJSON();
        
        apiResponse.success(response, res);
        return;
    } catch(error) {
        console.log(error);
        apiResponse.fail('Failed to update subcategory', res);
        return;
    }

}

function isInvalid(req){
    if(!req.params.location_id) return 'Invalid request - location_id is required in params';
    if(!req.params.department_id) return 'Invalid request - department_id is required in params';
    if(!req.params.category_id) return 'Invalid request - category_id is required in params';
    if(!req.params.subcategory_id) return 'Invalid request - subcategory_id is required in params';
    if(!req.body) return 'Invalid request - body is required';
}