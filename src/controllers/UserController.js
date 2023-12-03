import createUserToken from "../helpers/create-user-token.js";
import User from "../models/User.js";
import getToken from "../helpers/get-token.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getUserByToken from "../helpers/get-user-by-token.js";

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

  static async getUserById(req, res) {
    const id = req.params.id;

    let findUser;

    try {
      findUser = await User.findById(id).select("-password -confirmPassword");
    } catch (error) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    if (!findUser) {
      res.status(422).json({
        message: "User not found",
      });
      return;
    }
    res.status(200).json({ findUser });
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

  static async checkUser(req, res) {
    let currentUser;
    if (req.headers.authorization) {
      let token = getToken(req);
      const decoded = Jwt.verify(token, "oursecret");
      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
      res.status(401).json({ message: `Unauthorized` });
    }
  }

  static async editUser(req, res) {
    const token = getToken(req);
    const isFieldMissing = (field, fieldName) => {
      if (!field) {
        res.status(422).json({ message: `The ${fieldName} is necessary` });
        return;
      }
    };

    const user = await getUserByToken(token);

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    let image;

    if (req.file) {
      user.image = req.file.filename;
    }

    isFieldMissing(name, "name");
    user.name = name;

    isFieldMissing(email, "email");
    const userExists = await User.findOne({ email: email });
    if (user.email !== email && userExists) {
      res.status(422).json({ message: "Please, set other email" });
      return;
    }
    user.email = email;

    isFieldMissing(phone, "phone");
    user.phone = phone;

    if (password != confirmPassword) {
      res.status(422).json({ message: `The password not match` });
      return;
    } else if (password == confirmPassword && password != null) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );
      res.json({
        message: "User updated with success!",
        data: updatedUser,
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
