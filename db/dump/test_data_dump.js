const locationDao = require('../../dao/LocationDao');
const departmentDao = require('../../dao/DepartmentDao');
const categoryDao = require('../../dao/CategoryDao');
const subcategoryDao = require('../../dao/SubcategoryDao');

async function dumpData() {
    let locations = [
        {name: 'Perimeter', description: 'Perimeter aisle', code: 'pmtr'},
        {name: 'Center', description: 'Center aisle', code: 'cntr'}
    ]

    let departments = [
        {name: 'Bakery', description: 'Bakery items available', code: 'bkry'},
        {name: 'Dairy', description: 'Dairy items available', code: 'dary'}
    ]

    let categories = [
        {name: 'Bakery Bread', description: 'Bread category', code: 'bkrybrd'},
        {name: 'Cheeze', description: 'Cheeze category', code: 'chez'}
    ]

    let subcategories = [
        {name: 'Bakery Bread', description: 'Bread category', code: 'bkrybrd'},
        {name: 'Cheeze', description: 'Cheeze category', code: 'chez'}
    ]

    await locationDao.init();
    await departmentDao.init();
    await categoryDao.init();
    await subcategoryDao.init();

    for(let i=0; i<2; i++){
        let [locationId, departmentId, categoryId] = [];

        let locData = await locationDao.insertLocation(locations[i]);
        locations[i] = locData.toJSON();
        locationId = locations[i].id;
    
        departments[i].location_id = locationId;
        let depData = await departmentDao.insertDepartment(departments[i]);
        departments[i] = depData.toJSON();
        departmentId = departments[i].id;
    
        categories[i].location_id = locationId;
        categories[i].department_id = departmentId;
        let catData = await categoryDao.insertCategory(categories[i]);
        categories[i] = catData.toJSON();
        categoryId = categories[i].id;
    
        subcategories[i].location_id = locationId;
        subcategories[i].department_id = departmentId;
        subcategories[i].category_id = categoryId;
        let subcData = await subcategoryDao.insertSubcategory(subcategories[i]);
        subcategories[i] = subcData.toJSON();
    }
}

try{
    dumpData();
} catch(err){
    console.log(err);
}