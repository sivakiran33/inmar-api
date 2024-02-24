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
        let newDepartment = req.body;
        newDepartment.location_id = req.params.location_id;
        
        let dataObj = await departmentDao.insertDepartment(newDepartment);
        let response = dataObj.toJSON();
        
        apiResponse.success(response, res);
        return;
    } catch(error) {
        console.log(error);
        apiResponse.fail('Failed to create department', res);
        return;
    }
}

function isInvalid(req){
    if(!req.params.location_id) return 'Invalid request - location_id is required in params';
    if(!req.body) return 'Invalid request - body is required';
    if(!req.body.name) return 'Invalid request - name is required in body';
    if(!req.body.code) return 'Invalid request - code is required in body';
}