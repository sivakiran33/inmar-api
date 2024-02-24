const CategoryModel = require('../db/models/Category');

class CategoryDao {
    async init() {
        if (!this.Category) this.Category = await CategoryModel();
    }

    async insertCategory(category) {
        return await this.Category.create(category);
    }

    async getCategories(locationId, departmentId) {
        return await this.Category.findAll(
            { where: getBaseCondition(locationId, departmentId) }
        );
    }

    async getCategoryBy(locationId, departmentId, categoryId) {
        return await this.Category.findOne(
            { where: getBaseCondition(locationId, departmentId, categoryId) }
        );
    }

    async updateCategory(category) {
        let condition = getBaseCondition(category.location_id, category.department_id, category.id);
        await this.Category.update(
            category,
            { where: condition }
        );
        return await this.Category.findOne(
            { where: condition }
        );
    }

    async deleteCategory(locationId, departmentId, categoryId) {
        const category = await this.Category.findOne(
            { where: getBaseCondition(locationId, departmentId, categoryId) }
        );
        if(category) return await category.destroy();
        return true;
    }

}

function getBaseCondition(locationId, departmentId, categoryId) {
    let condition = { active: true };
    if (locationId) condition.location_id = locationId;
    if (departmentId) condition.department_id = departmentId;
    if (categoryId) condition.id = categoryId;
    return condition;
}

module.exports = new CategoryDao();