import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { UserDB } from '../types/interfaces';


// @desc  Register new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExist: UserDB = await User.findOne({ email })

  if (userExist) {
    res.status(400);
    throw new Error('User already Exist')
  }
  // SALT a random strign
  const salt = await bcrypt.genSalt(10);
  // Hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user: UserDB = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
  res.status(200).json({ message: 'Register User' });
});

// @desc  Get user data
// @route GET /api/users/me
// @access Public
const getMe = asyncHandler(async (req: any, res) => {
  res.status(200).json(req.user as unknown as UserDB);
});

// @desc  Authenticate an user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user: UserDB = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export {
  registerUser,
  getMe,
  loginUser,
}
