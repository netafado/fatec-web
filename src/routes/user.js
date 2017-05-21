
const express = require('express');

const controllerUser =  require('../controllers/controllerUser.js');

const router = express.Router();

// se entrar pelo get 
router.get('/', controllerUser.userPage);
// post
router.post('/', controllerUser.createUser);

module.exports = router;