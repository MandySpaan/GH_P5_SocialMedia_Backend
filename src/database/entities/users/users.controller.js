import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./user.model.js";
import { Types } from "mongoose";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      message: "All users retrieved",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Users can't be retrieved",
      error: error.message,
    });
  }
};

export const deleteUserByIdAdmin = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;

    const userIdToDeleteIsValid = Types.ObjectId.isValid(userIdToDelete);
    if (!userIdToDeleteIsValid) {
      return res.status(400).json({
        success: false,
        message: "User id not valid",
      });
    }

    const user = await User.findById(userIdToDelete);

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error trying to delete user",
      error: error.message,
    });
  }
};

export const getOwnProfile = async (req, res) => {
  try {
    const userId = req.tokenData.id;
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Can't find your profile",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Your profile is retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      susscess: false,
      message: "Error trying to retrieve your profile",
      error: error.message,
    });
  }
};

export const getUserProfileById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Can't find the profile",
      });
    }

    return res.status(201).json({
      success: true,
      message: "The profile is retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      susscess: false,
      message: "Error trying to retrieve your profile",
      error: error.message,
    });
  }
};

export const getFollowingProfiles = async (req, res) => {
  try {
    const userId = req.tokenData.id;

    const user = await User.findOne({ _id: userId }).select("following");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const followingIds = user.following;

    const followingProfiles = await User.find({ _id: { $in: followingIds } })
      .select("username first_name last_name description")
      .lean();

    return res.status(200).json({
      success: true,
      message: "Following profiles retrieved successfully",
      data: followingProfiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error trying to retrieve following profiles",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.tokenData.id;
    const { username, description, first_name, last_name, email, password } =
      req.body;

    let hashedPassword;

    if (password) {
      if (password.length < 8 || password.length > 15) {
        return res.status(400).json({
          success: false,
          message: "The password has to be between 8 and 15 characters",
        });
      } else {
        hashedPassword = bcrypt.hashSync(password, 10);
      }
    }

    const userUpdated = await User.updateOne(
      {
        _id: userIdToUpdate,
      },
      {
        username: username,
        description: description,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
      }
    );

    res.status(200).json({
      success: true,
      message: "User updated",
      data: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error trying to update user",
      error: error.message,
    });
  }
};

export const followUserById = async (req, res) => {
  try {
    const ownUserId = req.tokenData.id;
    const userIdToFollow = req.params.id;

    const ownUser = await User.findById(ownUserId);

    if (!ownUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const followUser = await User.findById(userIdToFollow);

    if (!followUser) {
      return res.status(404).json({
        success: false,
        message: "User to follow not found",
      });
    }

    const isFollowing = ownUser.following.includes(userIdToFollow);

    if (isFollowing) {
      ownUser.following.pull(userIdToFollow);
    } else {
      ownUser.following.push(userIdToFollow);
    }

    await ownUser.save();

    const newToken = jwt.sign(
      {
        _id: ownUser._id,
        role: ownUser.role,
        following: ownUser.following,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const message = isFollowing
      ? "User unfollowed successfully"
      : "User followed successfully";

    res.status(200).json({
      success: true,
      message: message,
      data: followUser,
      token: newToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error following/unfollowing user",
      error: error.message,
    });
  }
};
