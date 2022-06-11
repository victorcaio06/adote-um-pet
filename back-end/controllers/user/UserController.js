const UserModel = require('../../models/user/User');
const bcrypt = require('bcrypt');

class UserController {
  static async register(req, res) {
    const { name, email, phone, password, passwordConfirmation } = req.body;
    // const name = req.body.name;
    // const email = req.body.email;
    // const phone = req.body.phone;
    // const password = req.body.password;
    // const passwordConfirmation = req.body.passwordConfirmation;

    if (!name) {
      res.status(422).json({ message: 'Campo nome é OBRIGATÓRIO' });
      return;
    }
    if (!email) {
      res.status(422).json({ message: 'Campo email é OBRIGATÓRIO' });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: 'Campo telefone é OBRIGATÓRIO' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'Campo senha é OBRIGATÓRIO' });
      return;
    }
    if (!passwordConfirmation) {
      res
        .status(422)
        .json({ message: 'Campo confirmação de senha é OBRIGATÓRIO' });
      return;
    }
    if (password !== passwordConfirmation) {
      res.status(422).json({
        message: 'Campo senha diferente do campo confirmação de senha',
      });
    }

    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ message: 'Email inválido' });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const userCreat = new UserModel({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await userCreat.save();
      return res.status(201).json({ massage: 'Created', newUser });
    } catch (error) {
      res.status(500).json({ message: 'error' });
    }
  }
}

module.exports = UserController;
