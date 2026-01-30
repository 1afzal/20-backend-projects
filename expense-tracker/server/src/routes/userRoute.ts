import { Router } from "express";
const userRouter = Router();
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
userRouter.post(`/signup`, async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
      return res.status(404).json({
        message: "All fields required",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return res.status(200).json({
      message: "User created succesfully",
      user: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
});

userRouter.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          message: "All fields required",
        });
      }
  
      const foundUser = await userModel.findOne({ email });
      if (!foundUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      const passwordMatch = await bcrypt.compare(
        password,
        foundUser.password
      );
  
      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
  
      const token = jwt.sign(
        {
          userId: foundUser._id,
          email: foundUser.email,

        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "7d",
        }
      );
  
      return res.status(200).json({
        message: "Signin successful",
        token,
        user: {
          id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
export { userRouter }  ;