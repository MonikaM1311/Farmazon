const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const register = async (req, res) => {
  const { name, email, password, role, address, phone } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password, role, address, phone });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    address: user.address,
    token: generateToken(user._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    address: user.address,
    token: generateToken(user._id),
  });
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, address, phone, password } = req.body;
  if (name) user.name = name;
  if (address) user.address = address;
  if (phone) user.phone = phone;
  if (password) user.password = password;
  const updated = await user.save();
  res.json({ _id: updated._id, name: updated.name, email: updated.email, role: updated.role, address: updated.address });
};

module.exports = { register, login, getProfile, updateProfile };
