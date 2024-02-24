const DepartmentModel = require('../db/models/Department');

class DepartmentDao {
    async init() {
        if (!this.Department) this.Department = await DepartmentModel();
    }

    async getDepartments(locationId) {
        return await this.Department.findAll(
            { where: getBaseCondition(locationId) }
        );
    }

    async getDepartmentBy(locationId, departmentId) {
        return await this.Department.findOne(
            { where: getBaseCondition(locationId, departmentId) }
        );
    }

    async insertDepartment(department) {
        return await this.Department.create(department);
    }

    async updateDepartment(department) {
        await this.Department.update(
            department,
            { where: getBaseCondition(department.location_id, department.id) }
        );
        return await this.Department.findOne(
            { where: getBaseCondition(department.location_id, department.id) }
        );
    }

    async deleteDepartment(locationId, departmentId) {
        const department = await this.Department.findOne(
            { where: getBaseCondition(locationId, departmentId) }
        );
        if(department) return await department.destroy();
        return true;
    }
}

function getBaseCondition(locationId, departmentId) {
    let condition = { active: true }
    if (locationId) condition.location_id = locationId;
    if (departmentId) condition.id = departmentId;
    return condition;
}

module.exports = new DepartmentDao();