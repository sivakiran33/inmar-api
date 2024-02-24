const SubcategoryModel = require('../db/models/Subcategory');

class SubcategoryDao {
    async init() {
        if (!this.Subcategory) this.Subcategory = await SubcategoryModel();
    }

    async insertSubcategory(subcategory) {
        return await this.Subcategory.create(subcategory);
    }

    async getSubcategories(locationId, departmentId, categoryId) {
        let condition = getBaseCondition(locationId, departmentId, categoryId)
        return await this.Subcategory.findAll(
            { where: condition }
        );
    }

    async getSubcategoryBy(locationId, departmentId, categoryId, subcategoryId) {
        let condition = getBaseCondition(locationId, departmentId, categoryId, subcategoryId);
        return await this.Subcategory.findOne(
            { where: condition }
        );
    }

    async updateSubcategory(subcategory) {
        let condition = getBaseCondition(subcategory.location_id, subcategory.department_id, subcategory.category_id, subcategory.id);
        await this.Subcategory.update(
            subcategory,
            { where: condition }
        );
        return await this.Subcategory.findOne(
            { where: condition }
        );
    }

    async deleteSubcategory(locationId, departmentId, categoryId, subcategoryId) {
        const subcategory = await this.Subcategory.findOne(
            { where: getBaseCondition(locationId, departmentId, categoryId, subcategoryId) }
        );
        if(subcategory) return await subcategory.destroy();
        return true;
    }

}

function getBaseCondition(locationId, departmentId, categoryId, subcategoryId) {
    let condition = { active: true };
    if (locationId) condition.location_id = locationId;
    if (departmentId) condition.department_id = departmentId;
    if (categoryId) condition.category_id = categoryId;
    if (subcategoryId) condition.id = subcategoryId;
    return condition;
}

module.exports = new SubcategoryDao();