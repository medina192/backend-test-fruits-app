const { Router } = require('express');

const {
    CreateFruit,
    UpdateFruitStock,
    GetFruitsByCity,
    SendFruit,
    CreateFruitStock
} = require('../controllers/FruitController');

const { 
    validateBodySendFruit,
    validateBodyGetAllFruitsByCity, 
    validateBodyAddFruit,
    validateBodyUpdateFruitStock
} = require('../validators/FruitValidators');


const router = Router();

router.get("/", validateBodyGetAllFruitsByCity, GetFruitsByCity);

router.post("/", validateBodyAddFruit, CreateFruit);

router.post("/send-fruit", validateBodySendFruit, SendFruit);

router.post("/fruit-stock", validateBodyUpdateFruitStock, CreateFruitStock)

router.patch('/fruit-stock', validateBodyUpdateFruitStock, UpdateFruitStock);


module.exports = router;