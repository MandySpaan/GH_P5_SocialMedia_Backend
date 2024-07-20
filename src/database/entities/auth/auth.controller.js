import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../users/user.model.js";

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required ",
      });
    }

    if (password.length < 8 || password.length > 12) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 12 characters",
      });
    }

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "User registered",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Error trying to register user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: true,
        message: "email and password are required",
      });
    }

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unknown email address",
      });
    }

    const passwordVerified = bcrypt.compareSync(password, user.password);
    if (!passwordVerified) {
      return res.status(400).json({
        success: false,
        message: "The password you entered is incorrect",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      success: true,
      message: "User logged in",
      data: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error trying to log in",
      error: error,
    });
  }
};
