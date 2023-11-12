import User from "../models/User.js";
import { genSalt, hash } from "bcrypt";

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

    const userExists = await User.findOne({ email: email }).maxTimeMS(3000);
    if (userExists) {
      res.status(422).json({ message: `The user email already exist` });
      return;
    }

    const salt = await genSalt(12);
    const passwordHash = await hash(password, salt);

    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      res.status(201).json({
        message: "User Created!",
        newUser,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static handlePassword(res, password, confirmPassword) {
    if (password != confirmPassword) {
      res
        .status(422)
        .json({ message: `The password and confirmPassword is different` });
      return;
    }
  }
}
