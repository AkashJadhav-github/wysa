var express = require('express');
var router = express.Router();
var userServices = require('../services/userServices');
var verifyToken = require('../auth/verifyToken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', userServices.register);

router.post('/login', userServices.login);

router.post('/user', verifyToken, userServices.saveUserData)

module.exports = router;
