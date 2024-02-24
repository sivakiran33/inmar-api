const express = require('express');
const router = express.Router({ mergeParams: true });

const readDepartment = require('../controllers/department/readDepartment');
const createDepartment = require('../controllers/department/createDepartment');
const updateDepartment = require('../controllers/department/updateDepartment');
const deleteDepartment = require('../controllers/department/deleteDepartment');

// route = /api/v1/location/:location_id/department
router.route('/')
    .post(createDepartment)
    .get(readDepartment)
    .put(updateDepartment)
    .delete(deleteDepartment)

// route = /api/v1/location/:location_id/department/:department_id
router.route('/:department_id')
    .get(readDepartment)
    .put(updateDepartment)
    .delete(deleteDepartment)

module.exports = router;