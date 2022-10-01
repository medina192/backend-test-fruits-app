const City = require("../models/City");
const fs = require('fs');

const CreateCity = async(req, res) => {

    const { name } = req.body;

    try {
        const newCity = new City({ name })
        const citySaved = await newCity.save();
        return res.json({
            citySaved
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
} 



const SaveDataForMigration = async(req, res) => {

    try {
        const cities = await City.find();
            // creates a file in the same folder of this file with the text 'hola'
        fs.writeFile("./migration/CityMigration/cities.json", JSON.stringify(cities), (error) => {
            if(error) console.log('error', error);
            console.log('1')
        })

        return res.json({
            cities
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
    const getCitiesFromJsonFile = new Promise((resolve, reject) => {
        fs.readFile("./migration/CityMigration/cities.json", 'utf-8', (error, data) => {
            if(error){
                console.log('error', error);
                reject(error)
            }
            else {
                const citiesObj = JSON.parse(data);
                resolve(citiesObj);
            }  // returns a buffer
        })
    })

    const cities = await getCitiesFromJsonFile
        
    await City.insertMany(cities)


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
    CreateCity,
    SaveDataForMigration,
    GetDataForMigration
}