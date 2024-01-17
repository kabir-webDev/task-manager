import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../database/models/User.js';

const register = async ({ username, email, password, profession }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return 'User already exists';
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password:hashedPassword , email, profession });
    const isUserSaved = await user.save();
    if (isUserSaved) {
      return 'User registered successfully';
    }else{
      return 'Failed to register user';
    }
  } catch (error) {
    return 'Failed to register user';
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {status:'error', error:'Invalid credentials' };
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {status:'error', error:'Invalid credentials'};
    }
    const token = jwt.sign({ userId: user._id, username: user.username, email: user.email}, 'kabirTheSecret', { expiresIn: '1h' });
    return token;

  } catch (error) {
    return 'Failed to log in';
  }
};

export default {register,login};