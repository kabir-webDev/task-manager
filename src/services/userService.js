import mongoose from "mongoose";
import User from "../database/models/User.js";

const createNewUser  = async (newUser) => {
    try{
        const user = new User(newUser);
        await user.save();
        return user;
    }catch (error) {
        return 'Something went wrong!'
      }
}

const getAllUsers = async () => {
    try{
        const existingRecord = await User.find();
        return existingRecord;
      }catch (error) {
        return 'Something went wrong!';
    }
}

export default {
    createNewUser,
    getAllUsers
};