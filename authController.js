const User = require("./models/user");
const Role = require("./models/role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24hr" });
};

class authController {
  async registration(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response
          .status(400)
          .json({ message: "Failed registration", errors });
      }
      const { username, password } = request.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return response
          .status(400)
          .json({ message: `We have this user: ${username} already` });
      }
      const userRole = await Role.findOne({ value: "USER" });
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });

      await user.save();
      return response.json({ message: "User successfully created" });
    } catch (error) {
      console.log(error);
      request.status(400).json({ message: "Registration error" });
    }
  }
  async login(request, response) {
    try {
      const { username, password } = request.body;
      const user = await User.findOne({ username });
      if (!user) {
        return response
          .status(400)
          .json({ message: `Invalid username or password combination` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return response.status(400).json({ message: `Wrong password` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return response.json({ token });
    } catch (error) {
      console.log(error);
      request.status(400).json({ message: "Login error" });
    }
  }
  async refresh(require, response) {
    try {
      const users = await User.find();
      return response.json(users);
    } catch (error) {
      con;
    }
  }
  async activate(require, response) {
    try {
      const users = await User.find();
      return response.json(users);
    } catch (error) {
      con;
    }
  }
  async logout(require, response) {
    try {
      const users = await User.find();
      return response.json(users);
    } catch (error) {
      con;
    }
  }

  async getUsers(require, response) {
    try {
      // const users = await User.find();
      // return response.json(users);
      const userRole = new Role();
      await userRole.save();
      response.json("server work");
    } catch (error) {
      con;
    }
  }
}

module.exports = new authController();
