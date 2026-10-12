import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js"; // Import User model from your modified schema
import dotenv from 'dotenv';
import verifyToken from "../middleware/auth.js";

const router = express.Router();

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

// for register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const existUser = await User.findOne({email})
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generating token
    const token = jwt.sign(
      { userId: user._id },
      secretKey,
      { expiresIn: "10d" }
    );

    // Setting token as cookie
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 864000000, // 10 days
    });

    res.status(200).json({message: "Login success"})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/validate-token', verifyToken, async (req, res) => {
  try {
    // If the middleware verifies the token, return the userId
    const userId = req.userId;
    res.status(200).json({ userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
