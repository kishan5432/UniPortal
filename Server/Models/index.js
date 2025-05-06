import mongoose from "mongoose";
import UserModel from "./User.js";
import FacultyModel from "./Faculty.js"

export const User = UserModel;
export const Faculty = FacultyModel;

export default {
  User: UserModel,
  Faculty: FacultyModel,
  
};