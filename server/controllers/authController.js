const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel")

const signUp = async (req, res) => {
    try {
      const { username, password, role } = req.body;
      const newUser = new User({ username, password, role });
      const user = await User.findOne({ username });
      if(user)
      {
          return res.status(400).json("user is already exist with this user name");
      }
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = { signUp, login };
  