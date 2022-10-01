const City = require("../models/City");

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

module.exports = {
    CreateCity
}