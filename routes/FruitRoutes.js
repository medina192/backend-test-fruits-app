const { Router } = require('express');
//const { validateToken } = require('../middlewares/validateToken');


const {
    getFruitsByCity,
    CreateFruit,
    SendFruit,
    UpdateFruitStock
} = require('../controllers/FruitController');

const { 
    validateQueryGetFruits,
    validateBodyAddFruit,
    validateBodySendFruit,
    validateBodyUpdateFruitStock
} = require('../validators/FruitValidators');


const router = Router();

router.get("/fruits-by-city", validateQueryGetFruits, getFruitsByCity)

router.post("/", validateBodyAddFruit, CreateFruit);

router.post("/send-fruit", validateBodySendFruit, SendFruit);

router.patch('/stock', validateBodyUpdateFruitStock, UpdateFruitStock);


module.exports = router;