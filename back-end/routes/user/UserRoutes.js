const UserRoutes = require('express').Router();
const UserController = require('./../../controllers/user/UserController');

UserRoutes.get('/register', UserController.register);

module.exports = UserRoutes;
