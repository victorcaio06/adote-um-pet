const UserModel = require('../../models/user/User');
const bcrypt = require('bcrypt');
const userToken = require('../../helpers/createUserToken');
const getToken = require('../../helpers/getToken');
const jwt = require('jsonwebtoken');

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
      return;
    }

    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ message: 'Email inválido, utlize outro' });
      return;
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
      await userToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: 'error' });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(422).json({ message: 'E-mail inválido!' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'Senha inválida!' });
      return;
    }

    const checkExistingEmail = await UserModel.findOne({ email: email });
    if (!checkExistingEmail) {
      res
        .status(422)
        .json({ message: 'Não há usuário cadastrado com esse e-mail!' });
      return;
    }

    const checkPassword = await bcrypt.compare(
      password,
      checkExistingEmail.password
    );
    if (!checkPassword) {
      res.status(422).json({ message: 'Senha inválida!' });
      return;
    }
    await userToken(checkExistingEmail, req, res);
  }

  static async checkUserToken(req, res) {
    let currentUser;
    if(req.headers.authorization){ 
      const token = getToken(req);
      const decoded = jwt.verify(token, 'nossosecret');
      currentUser = await UserModel.findById(decoded.id, {password: 0});
    } else {
      currentUser = 0;
    }
    res.status(200).send(currentUser);
  }
}

module.exports = UserController;
