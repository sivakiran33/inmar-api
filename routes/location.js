const express = require('express');
const router = express.Router({ mergeParams: true });

const readLocation = require('../controllers/location/readLocation');
const createLocation = require('../controllers/location/createLocation');
const updateLocation = require('../controllers/location/updateLocation');
const deleteLocation = require('../controllers/location/deleteLocation');

// route = /api/v1/location
router.route('/')
    .post(createLocation)
    .get(readLocation)
    .put(updateLocation)
    .delete(deleteLocation)

// route = /api/v1/location/:location_id
router.route('/:location_id')
    .get(readLocation)
    .put(updateLocation)
    .delete(deleteLocation)

module.exports = router;