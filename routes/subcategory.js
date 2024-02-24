const express = require('express');
const router = express.Router({ mergeParams: true });

const readSubcategory = require('../controllers/subcategory/readSubcategory');
const createSubcategory = require('../controllers/subcategory/createSubcategory');
const updateSubcategory = require('../controllers/subcategory/updateSubcategory');
const deleteSubcategory = require('../controllers/subcategory/deleteSubcategory');

// route = /api/v1/location/:location_id/department/:department_id/category/:category_id/subcategory/
router.route('/')
    .post(createSubcategory)
    .get(readSubcategory)
    .put(updateSubcategory)
    .delete(deleteSubcategory)

// route = /api/v1/location/:location_id/department/:department_id/category/:category_id/subcategory/:category_id
router.route('/:subcategory_id')
    .get(readSubcategory)
    .put(updateSubcategory)
    .delete(deleteSubcategory)

module.exports = router;