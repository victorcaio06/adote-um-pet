const UserModel = require('../../models/user/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../../helpers/createUserToken');

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
      res.status(422).json({ message: 'Email inválido, utlize outro' });
    }

    //Creating a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const userCreate = new UserModel({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await userCreate.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: 'error' });
    }
  }

  static async login(req, res) {
    const {email, password} = req.body;
    if(!email){
      res.status(422).json({message: 'E-mail inválido!'})
    }
    if(!password){
      res.status(422).json({message: 'Senha inválida!'})
    }
  }
}

module.exports = UserController;
