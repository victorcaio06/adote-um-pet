const UserRoutes = require('express').Router();
const UserController = require('./../../controllers/user/UserController');

//middleware
const verifyToken = require('../../helpers/verifyToken');

UserRoutes.post('/register', UserController.register);
UserRoutes.post('/login', UserController.login);
UserRoutes.get('/checkUser', UserController.checkUserToken);
UserRoutes.get('/:id', UserController.getUserById);
UserRoutes.patch('/edit/:id', verifyToken, UserController.editUser);
module.exports = UserRoutes;
