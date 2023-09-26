import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import Planet from '../models/planetModel';

type UserInterface = {
  id: string | number,
  name: string,
  email: string,
  hobbies: Array<string>
}


// @desc  Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400);
    throw new Error('User already Exist')
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      hobbies: user.hobbies
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

  res.status(200).json(req.user as unknown as UserInterface);
});

const getAllUsers = asyncHandler(async (req: any, res) => {
  User.find({})
    .then((data) => {
      console.log("--------->", data);
      if (data.length > 0) {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      console.log("ERROR ------>>", err);
    });
})

export {
  registerUser,
  getMe,
  getAllUsers,
}
