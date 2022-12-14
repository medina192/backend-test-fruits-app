const Fruit = require("../models/Fruit");
const Stock = require("../models/Stock");
const City = require("../models/City");
const fs = require('fs');

/*
    http://localhost:3000/api/fruit
    {
        "name": "Cherry",
        "imgUrl": "https://res.cloudinary.com/dvtdipogm/image/upload/v1664574141/cherry_qjcjyv.png",
        "price": 3.8,
        "score": 4.5
    }
*/

const CreateFruit = async(req, res) => {
    
    //const { name, stock, cityId, description, price, score } = req.body;
    const fruitProperties = req.body;
    
    try {
        const newFruit = new Fruit( fruitProperties )
        const fruitSaved = await newFruit.save();
        res.json({
            fruitSaved
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}


const SendFruit = async(req, res) => {
    
    const { remitentCityId, destinataryCityId, fruitId, quantity } = req.body;

    try {
        //.updateOne({ $and: [ { cityId, remitentCityId }, { fruitId } ] }, { $set: { name: 'Web Analytics' } })
        const { stock: remitentStock } = await Stock.findOne({ $and: [ {cityId: remitentCityId, fruitId} ]})
        const { stock: destinataryStock } = await Stock.findOne({ $and: [ { cityId: destinataryCityId, fruitId} ]})
        await Stock.updateOne({ $and: [ {cityId: remitentCityId, fruitId} ] }, { $set: { stock: remitentStock - quantity}})
        await Stock.updateOne({ $and: [ {cityId: destinataryCityId, fruitId} ] }, { $set: { stock: destinataryStock + quantity}})
        return res.json({
            message: "Stocks Updated"
        })
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            message: error
        })
    }
}


/*
    http://localhost:3000/api/fruit
    {
        "cityId": "63375ec652585f39c1c256ec"
    }
*/
const GetFruitsByCity = async(req, res) => {
    
    const { cityId } = req.body;

    try {
        const fruits = await Stock.find({ cityId }).populate("fruitId", ["name", "price", "score", "imgUrl"])
        const simpleObjFruit = fruits.map((fruit) => {
            const fruitObj = {
                _id: fruit.fruitId._id,
                name: fruit.fruitId.name,
                imgUrl: fruit.fruitId.imgUrl,
                price: fruit.fruitId.price,
                score: fruit.fruitId.score,
                stock: fruit.stock
            }
            return fruitObj
        })
        return res.json({
            fruits: simpleObjFruit
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

const GetAllFruits = async(req, res) => {

    try {
        const fruits = await Stock.find().populate("fruitId", ["name", "price", "score", "imgUrl"]).populate("cityId", [ "name" ])
        const simpleObjFruit = fruits.map((fruit) => {
            const fruitObj = {
                _id: fruit.fruitId._id,
                name: fruit.fruitId.name,
                imgUrl: fruit.fruitId.imgUrl,
                price: fruit.fruitId.price,
                score: fruit.fruitId.score,
                stock: fruit.stock,
                cityId: fruit.cityId._id,
                cityName: fruit.cityId.name 
            }
            return fruitObj
        })

        const groupFruitsByCity = simpleObjFruit.reduce((group, fruit) => {
            const { cityName } = fruit;
            group[cityName] = group[cityName] ?? [];
            group[cityName].push(fruit);
            return group;
          }, {});

          const groupByFruitsCityArray = []
          for(const keyCityName in groupFruitsByCity)
          {
            groupByFruitsCityArray.push({ 
                cityName: keyCityName, 
                cityId: groupFruitsByCity[keyCityName][0].cityId,
                fruits: groupFruitsByCity[keyCityName]}) 
          }

        return res.json({
            groups: groupByFruitsCityArray
        })
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            message: error
        })
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



/*
    http://localhost:3000/api/fruit/fruit-stock
    {
        "quantity": 63,
        "cityId": "63375ec652585f39c1c256ec",
        "fruitId": "6337ba09103952039b98fefe"
    }
*/
const CreateFruitStock = async(req, res) => {

    const { fruitId, cityId, quantity: stock } = req.body;

    try {
        const newStock = new Stock({
            fruitId,
            cityId,
            stock
        })
        const stockSaved = await newStock.save();
        return res.json({
            stockSaved
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}



const SaveDataForMigration = async(req, res) => {

    try {
        const fruits = await Fruit.find();
            // creates a file in the same folder of this file with the text 'hola'
        fs.writeFile("./migration/FruitMigration/fruits.json", JSON.stringify(fruits), (error) => {
            if(error) console.log('error', error);
            console.log('1')
        })

        return res.json({
            fruits
        })
    } catch (error) {
        console.log("error", error)
        return res.status(400).json({
            message: error
        })
    }
} 


const GetDataForMigration = async(req, res) => {

    try {
        // creates a file in the same folder of this file with the text 'hola'
    const getFruitsFromJsonFile = new Promise((resolve, reject) => {
        fs.readFile("./migration/FruitMigration/fruits.json", 'utf-8', (error, data) => {
            if(error){
                console.log('error', error);
                reject(error)
            }
            else {
                const fruitsObj = JSON.parse(data);
                resolve(fruitsObj);
            }  // returns a buffer
        })
    })

    const fruits = await getFruitsFromJsonFile
        
    await Fruit.insertMany(fruits)


    return res.json({
        migration: "completed",
    })
    } catch (error) {
        console.log("error", error)
        return res.status(400).json({
            message: error
        })
    }
} 




module.exports = {
    CreateFruit,
    UpdateFruitStock,
    GetFruitsByCity,
    SendFruit,
    CreateFruitStock,
    SaveDataForMigration,
    GetDataForMigration,
    GetAllFruits  
}