const { Router } = require('express');

const {
    CreateCity
} = require('../controllers/CityController');

const { 
    validateBodyCreateCity 
} = require('../validators/CityValidators');


const router = Router();


router.post("/", validateBodyCreateCity , CreateCity);


module.exports = router;