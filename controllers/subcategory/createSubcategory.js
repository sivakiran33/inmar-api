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
        let newSubcategory = req.body;
        let [locationId, departmentId, categoryId] = [req.params.location_id, req.params.department_id, req.params.category_id];
        newSubcategory.location_id = locationId;
        newSubcategory.department_id = departmentId;
        newSubcategory.category_id = categoryId;
        
        let dataObj = await subcategoryDao.insertSubcategory(newSubcategory);
        let response = dataObj.toJSON();
        
        apiResponse.success(response, res);
        return;
    } catch(error) {
        console.log(error);
        apiResponse.fail('Failed to create subcategory', res);
        return;
    }

}

function isInvalid(req){
    if(!req.params.location_id) return 'Invalid request - location_id is required in params';
    if(!req.params.department_id) return 'Invalid request - department_id is required in params';
    if(!req.params.category_id) return 'Invalid request - category_id is required in params';
    if(!req.body) return 'Invalid request - body is required';
    if(!req.body.name) return 'Invalid request - name is required in body';
    if(!req.body.code) return 'Invalid request - code is required in body';
}