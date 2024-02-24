const express = require('express');
const router = express.Router({ mergeParams: true });

const readCategory = require('../controllers/category/readCategory');
const createCategory = require('../controllers/category/createCategory');
const updateCategory = require('../controllers/category/updateCategory');
const deleteCategory = require('../controllers/category/deleteCategory');

// route = /api/v1/location/:location_id/department/:department_id/category/
router.route('/')
    .post(createCategory)
    .get(readCategory)
    .put(updateCategory)
    .delete(deleteCategory)

// route = /api/v1/location/:location_id/department/:department_id/category/:category_id
router.route('/:category_id')
    .get(readCategory)
    .put(updateCategory)
    .delete(deleteCategory)

module.exports = router;