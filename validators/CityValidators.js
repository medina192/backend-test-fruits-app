const { body } = require('express-validator');
const { validateResult } = require('../services/generalValidator');


const validateBodyCreateCity = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage('Enter a valid name'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validateBodyCreateCity
}