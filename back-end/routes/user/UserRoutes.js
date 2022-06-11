const UserRoutes = require('express').Router();
const UserController = require('./../../controllers/user/UserController');

UserRoutes.post('/register', UserController.register);

module.exports = UserRoutes;
