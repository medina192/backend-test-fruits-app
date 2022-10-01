const { Router } = require('express');

const {
    CreateUser,
    LogIn,
    LogOut
} = require('../controllers/UserController');

const { 
    validateBodyCreateUser, 
    validateBodyLogin 
} = require('../validators/UserValidators');


const router = Router();

router.post('/createuser', validateBodyCreateUser, CreateUser);

router.post('/login', validateBodyLogin, LogIn);

router.post('/logout', LogOut);

module.exports = router;