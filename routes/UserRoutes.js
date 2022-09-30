const { Router } = require('express');
//const { validateToken } = require('../middlewares/validateToken');


const {
    CreateUser,
    LogIn,
    //AuthWithToken,
    LogOut
} = require('../controllers/UserController');
const { exists } = require('../models/User');
const { 
    validateBodyCreateUser, 
    validateBodyLogin 
} = require('../validators/UserValidators');


const router = Router();

router.post('/createuser', validateBodyCreateUser, CreateUser);

router.post('/login', validateBodyLogin, LogIn);

router.post('/logout', LogOut);
//router.post('/authToken', validateToken, AuthWithToken);

module.exports = router;