const { Router } = require('express');

const {
    CreateCity,
    GetAllCities,
    SaveDataForMigration,
    GetDataForMigration
} = require('../controllers/CityController');

const { 
    validateBodyCreateCity 
} = require('../validators/CityValidators');


const router = Router();

router.get("/", GetAllCities)

router.post("/", validateBodyCreateCity , CreateCity);

router.get("/migrate-city-from-local", SaveDataForMigration);

router.get("/migrate-city-to-cloud", GetDataForMigration);

module.exports = router;