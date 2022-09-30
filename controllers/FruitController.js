const Fruit = require('../models/Fruit');


const getFruitsByCity = async(req, res) => {
    
    const { cityId} = req.body;

    try {
        const newFruit = new Fruit({

        })
    } catch (error) {
        
    }
}

const CreateFruit = async(req, res) => {
    
    const { name, stock, cityId, description, price, score } = req.body;

    try {
        const newFruit = new Fruit({

        })
    } catch (error) {
        
    }
}

const SendFruit = async(req, res) => {
    
    const { remitentCityId, destinataryCityId, fruitId, quantity } = req.body;

    try {
        const newFruit = new Fruit({

        })
    } catch (error) {
        
    }
}

const UpdateFruitStock = async(req, res) => {
    
    const { fruitId, quantity } = req.body;

    try {
        const newFruit = new Fruit({

        })
    } catch (error) {
        
    }
}

module.exports = {
    getFruitsByCity,
    CreateFruit,
    SendFruit,
    UpdateFruitStock
}