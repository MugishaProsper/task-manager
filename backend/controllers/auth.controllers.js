import User from "../models/user.models.js";
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from "../plugins/generate.token.js";

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(user){
      return res.status(401).json({ message : "User already exists" });
    };
    const hashedPassword = await bcrypt.hash(password, 12)
    const new_user = new User({ fullName, email, password : hashedPassword });
    await new_user.save();
    return res.status(200).json({ message : "Registered successfully", new_user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({ message : "Invalid email" })
    };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(401).json({ message : "Passport incorrect" });
    };
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({ message : "Login successfull", user })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}