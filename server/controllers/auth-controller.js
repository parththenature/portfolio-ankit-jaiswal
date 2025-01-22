const User = require('../models/user-model');

//* Home Logic
const home = async (req, res) => {
  try {
    res.status(200).send({ msg: "Welcome to our home page controllers" });
  } catch (error) {
    console.log(error);
  }
};

//* Registration Logic
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({ message: 'Email already exists' });
    }
    const userCreated = await User.create({ username, email, phone, password });
    res.status(201).send({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });

  } catch (error) {
    next(error);
  }
};

// * User Login Logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    // Compare passwords
    const isPasswordMatch = await userExist.comparePassword(password)

    if (!isPasswordMatch) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    // Generate token
    const token = await userExist.generateToken();

    // Send success response
    return res.status(200).send({
      message: "Login Successful",
      token: token,
      userId: userExist._id.toString(),
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//* User Logic - To send User data
const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    // res.status(200).send({ message: "Hi User Data" });
    return res.status(200).send({ userData });
  } catch (error) {
    console.log(`Error from the user route ${error}`);

  }
};

module.exports = { home, register, login, user };