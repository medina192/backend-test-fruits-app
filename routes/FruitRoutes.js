const { Router } = require('express');

const {
    CreateFruit,
    UpdateFruitStock,
    GetFruitsByCity,
    SendFruit,
    CreateFruitStock,
    SaveDataForMigration,
    GetDataForMigration,
    GetAllFruits 
} = require('../controllers/FruitController');

const { 
    validateBodySendFruit,
    validateBodyGetAllFruitsByCity, 
    validateBodyAddFruit,
    validateBodyUpdateFruitStock
} = require('../validators/FruitValidators');


const router = Router();

router.get("/", GetAllFruits);

router.post("/get-fruits-by-city",  GetFruitsByCity);

router.post("/", validateBodyAddFruit, CreateFruit);

router.post("/send-fruit", validateBodySendFruit, SendFruit);

router.post("/fruit-stock", validateBodyUpdateFruitStock, CreateFruitStock)

router.patch('/fruit-stock', validateBodyUpdateFruitStock, UpdateFruitStock);

router.get("/migrate-fruit-from-local", SaveDataForMigration);

router.get("/migrate-fruit-to-cloud", GetDataForMigration);


module.exports = router;