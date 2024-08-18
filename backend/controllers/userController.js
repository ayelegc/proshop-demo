import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Authenticate user and get the token
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id); 

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc User Registration
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  const userExists = await User.findOne({ email });
  if(userExists){
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if(user){
    generateToken(res, user._id); 
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }else{
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
  // Implement logout logic here
  //res.send('logout user');
  res.cookie('jwt', '', {
    httpOnly:true,
    expires:new Date(0)
  });

  res.status(200).json({message: 'Logged out successfully'});
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // Implement get user profile logic here
  const user = await User.findById(req.user._id);
  if(user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }else {
    res.status(404);
    throw new Error ('User not found');
  }
 
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  // Implement update user profile logic here
  const user = await User.findById(req.user._id);
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password){
      user.password = req.body.password;
    }
    const updateUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  }else {
    res.status(404);
    throw new Error('User not found');
  }
 
});

// @desc Get users
// @route GET /api/users
// @access private/Admin
const getUsers = asyncHandler(async (req, res) => {
  // Implement get users logic here
  res.send('get users');
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  // Implement get user by ID logic here
  res.send('get user by ID');
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  // Implement delete user logic here
  res.send('delete user');
});

// @desc Update user
// @route PUT /api/users/:id
// @access private/Admin
const updateUser = asyncHandler(async (req, res) => {
  // Implement update user logic here
  res.send('update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
