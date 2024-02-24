const departmentDao = require('../../dao/DepartmentDao');
const apiResponse = require('../../utils/apiResponse');

module.exports = async(req, res) => {

    let invalidMessage = isInvalid(req);
    
    if(invalidMessage != undefined) {
        apiResponse.fail(invalidMessage, res);
        return;
    }

    try{
        await departmentDao.init();
        let [locationId, departmentId] = [req.params.location_id, req.params.department_id];
        
        let updatedDepartment = req.body;
        updatedDepartment.location_id = locationId;
        updatedDepartment.id = departmentId;

        let dataObj = await departmentDao.updateDepartment(updatedDepartment);
        let response = dataObj.toJSON();
        
        apiResponse.success(response, res);
        return;
    } catch(error) {
        console.log(error);
        apiResponse.fail('Failed to update department', res);
        return;
    }

}

function isInvalid(req){
    if(!req.params.location_id) return 'Invalid request - location_id is required in params';
    if(!req.params.department_id) return 'Invalid request - department_id is required in params';
    if(!req.body) return 'Invalid request - body is required';
}