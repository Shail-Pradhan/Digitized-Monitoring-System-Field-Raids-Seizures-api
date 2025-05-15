import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const register = async (req, res) => {
    try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hashedPassword,
        role
    });
    await newUser.save();
    res.status(201).json({
        message: `User registered successfully with username: ${username}`
    });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred during registration.",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "User with this username does not exist."
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password."
            });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
            error: error.message
        });
    }
    }

export { register, login };