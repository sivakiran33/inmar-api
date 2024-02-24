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
        let response = null;

        if(departmentId){
            let dataObj = await departmentDao.getDepartmentBy(locationId, departmentId);
            response = dataObj.toJSON()
        } else {
            let dataObj = await departmentDao.getDepartments(locationId);
            response = dataObj.map(dep=>dep.toJSON());
        }
        
        apiResponse.success(response, res);
        return;
    } catch(error) {
        console.log(error);
        apiResponse.fail('Failed to get department', res);
        return;
    }

}

function isInvalid(req){
    if(!req.params.location_id) return 'Invalid request - location_id is required in params';
}