const express = require('express');
const router = express.Router();
const PlantService = require('../services/PlantService')

/* GET list of plants */
router.get('/', function(req, res, next) {
    res.send(PlantService.listPlants())
});

module.exports = router;
