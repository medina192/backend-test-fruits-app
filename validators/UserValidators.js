const { body } = require('express-validator');
const { validateResult } = require('../services/generalValidator');


const validateBodyCreateUser = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage('Enter a valid name'),
	body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Enter a valid email'),
	body('password')
		.isLength({ min: 6, max: 20 })
		.withMessage('Password must be 8 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateBodyLogin = [
	body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Enter a valid email'),
	body('password')
		.isLength({ min: 6, max: 20 })
		.withMessage('Password must be 8 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validateBodyCreateUser,
    validateBodyLogin
}