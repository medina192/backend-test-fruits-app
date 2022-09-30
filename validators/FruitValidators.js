const { body } = require('express-validator');
const { validateResult } = require('../services/generalValidator');


const validateQueryGetFruits = [
	body("cityId")
        .isLength({ min: 18, max: 18 })
        .withMessage("Send a valid cityId value"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateBodyAddFruit = [
    body("name")
        .isString()
        .notEmpty()
        .withMessage("Send a valid name value"),
	body("stock")
        .isNumeric()
        .notEmpty()
        .withMessage("Send a valid stock value"),
	body("cityId")
		.isLength({ min: 18, max: 18 })
		.withMessage("Send a valid city Id value"),
    body("description")
        .isString()
        .notEmpty()
        .withMessage("Send a valid description value"),
    body("price")
        .isNumeric()
        .notEmpty()
        .withMessage("Send a valid price value"),
    body("price")
        .isFloat({ min: 0, max: 5})
        .withMessage("Send a score value between 0 and 5")
        .notEmpty()
        .withMessage("Send a valid score value"),
    body("imgUrl")
        .isString()
        .notEmpty()
        .withMessage("Send a valid image url value"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateBodySendFruit = [
	body("remitentCityId")
        .isLength({ min: 18, max: 18 })
        .withMessage("Send a valid cityId value"),
	body("destinataryCityId")
        .isLength({ min: 18, max: 18 })
        .withMessage("Send a valid cityId value"),
    body("fruitId")
        .isLength({ min: 18, max: 18 })
        .withMessage("Send a valid fruit Id value"),
    body("quantity")
        .isNumeric()
        .notEmpty()
        .withMessage("Send a valid quantity value"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateBodyUpdateFruitStock = [
    body("fruitId")
        .isLength({ min: 18, max: 18 })
        .withMessage("Send a valid fruit Id value"),
    body("quantity")
        .isNumeric()
        .notEmpty()
        .withMessage("Send a valid quantity value"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validateQueryGetFruits,
    validateBodyAddFruit,
    validateBodySendFruit,
    validateBodyUpdateFruitStock
}