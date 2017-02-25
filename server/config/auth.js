const path = require('path');
const router = require('express').Router();
const Auth = require(path.resolve('server', 'controllers', 'users'));

router.post('/login', Auth.login);
router.post('/register', Auth.register);

module.exports = router;
