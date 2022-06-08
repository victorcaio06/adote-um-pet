const UserModel = require('../../models/user/User');

class UserController {
  static async register(req, res) {
    res.json('Hello World Get a Pet!');
  }
}

module.exports = UserController;
