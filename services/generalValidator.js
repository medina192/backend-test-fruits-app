const { body, validationResult, check } = require('express-validator');

const validateResult = async(req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(403).json({
            message: error.array()
        })
    }
}

module.exports = {
    validateResult
}

