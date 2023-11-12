import createUserToken from "../helpers/create-user-token.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export default class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body;
    const isFieldMissing = (field, fieldName) => {
      if (!field) {
        res.status(422).json({ message: `The ${fieldName} is necessary` });
        return true;
      }
      return false;
    };
    switch (true) {
      case isFieldMissing(name, "name"):
      case isFieldMissing(email, "email"):
      case isFieldMissing(phone, "phone"):
      case isFieldMissing(password, "password"):
      case isFieldMissing(confirmPassword, "confirmPassword"):
        return;
    }
    UserController.handlePassword(res, password, confirmPassword);
    UserController.handleUserVerification(email, res);

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const confirmPasswordHash = await bcrypt.hash(confirmPassword, salt);

    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
      confirmPassword: confirmPasswordHash,
    });

    UserController.handleUserCreate(user, req, res);
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const isFieldMissing = (field, fieldName) => {
      if (!field) {
        res.status(422).json({ message: `The ${fieldName} is necessary` });
        return true;
      }
      return false;
    };

    if (true) {
      isFieldMissing(email, "email");
      isFieldMissing(password, "password");
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({
        message: `The user or password not exists, please, verify your informations and try again.`,
      });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(422).json({
        message: `The user or password not exists, please, verify your informations and try again.`,
      });
      return;
    }

    await createUserToken(user, req, res);
  }

  static handlePassword(res, password, confirmPassword) {
    if (password != confirmPassword) {
      res
        .status(422)
        .json({ message: `The password and confirmPassword is different` });
      return;
    }
  }

  static async handleUserVerification(email, res) {
    const userExists = await User.findOne({ email: email }).maxTimeMS(3000);
    if (userExists) {
      res.status(422).json({ message: `The user email already exist` });
      return;
    }
  }

  static async handleUserCreate(user, req, res) {
    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  }
}
