const UserRoutes = require('express').Router();
const UserController = require('./../../controllers/user/UserController');

UserRoutes.post('/register', UserController.register);
UserRoutes.post('/login', UserController.login);
UserRoutes.get('/checkUser', UserController.checkUserToken);

module.exports = UserRoutes;
