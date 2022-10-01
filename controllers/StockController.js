const Stock = require("../models/Stock");
const fs = require('fs');


const SaveDataForMigration = async(req, res) => {

    try {
        const stocks = await Stock.find();
            // creates a file in the same folder of this file with the text 'hola'
        fs.writeFile("./migration/StockMigration/stocks.json", JSON.stringify(stocks), (error) => {
            if(error) console.log('error', error);
        })

        return res.json({
            stocks
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
        const getStocksFromJsonFile = new Promise((resolve, reject) => {
            fs.readFile("./migration/StockMigration/stocks.json", 'utf-8', (error, data) => {
                if(error){
                    console.log('error', error);
                    reject(error)
                }
                else {
                    const stocksObj = JSON.parse(data);
                    resolve(stocksObj);
                }  // returns a buffer
            })
        })

        const stocks = await getStocksFromJsonFile
            
        const r = await Stock.insertMany(stocks)


        return res.json({
            migration: "completed",
            stocks
        })
    } catch (error) {
        console.log("error", error)
        return res.status(400).json({
            message: error
        })
    }
} 

module.exports = {
    SaveDataForMigration,
    GetDataForMigration
}