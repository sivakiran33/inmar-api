const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const locationRouter = require('./location');
const departmentRouter = require('./department');
const categoryRouter = require('./category');
const subcategoryRouter = require('./subcategory');

const getSku = require('../controllers/sku');

module.exports.loadAPIs = (router) => {

    categoryRouter.use('/:category_id/subcategory', jsonParser, subcategoryRouter);

    departmentRouter.use('/:department_id/category', jsonParser, categoryRouter);

    locationRouter.use('/:location_id/department', jsonParser, departmentRouter);

    router.use('/location', jsonParser, locationRouter);

    router.get('/sku', jsonParser, getSku);

}