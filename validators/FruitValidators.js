const { body, check, param } = require('express-validator');
const { validateResult } = require('../services/generalValidator');



const validateBodyAddFruit = [
    body("name")
        .isString()
        .notEmpty()
        .withMessage("Send a valid name value"),
    body("imgUrl")
        .isString()
        .notEmpty()
        .withMessage("Send a valid imgUrl value"),
    body("price")
        .isFloat({ min: 0, max: 5})
        .withMessage("Send a score value between 0 and 5")
        .notEmpty()
        .withMessage("Send a valid price value"),
    body("score")
        .isNumeric()
        .notEmpty()
        .withMessage("Send a valid score value"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]



const validateBodyUpdateFruitStock = [
    body("fruitId")
        .isLength({ min: 24, max: 24 })
        .withMessage("Send a valid fruit Id value"),
    body("cityId")
        .isLength({ min: 24, max: 24 })
        .withMessage("Send a valid city Id value"),
    body("quantity")
        .isNumeric()
        .notEmpty()
        .withMessage("Send a valid quantity value"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateBodySendFruit = [
	body("remitentCityId")
        .isLength({ min: 24, max: 24 })
        .withMessage("Send a valid cityId value"),
	body("destinataryCityId")
        .isLength({ min: 24, max: 24 })
        .withMessage("Send a valid cityId value"),
    body("fruitId")
        .isLength({ min: 24, max: 24 })
        .withMessage("Send a valid fruit Id value"),
    body("quantity")
        .isNumeric()
        .notEmpty()
        .withMessage("Send a valid quantity value"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]


const validateBodyGetAllFruitsByCity = [
	check("cityId")
        .isLength({ min: 24, max: 24 })
        .withMessage("Send a valid cityId value"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]



module.exports = {
    validateBodyAddFruit,
    validateBodyUpdateFruitStock,
    validateBodyGetAllFruitsByCity, 
    validateBodySendFruit,
}