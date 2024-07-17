import User from "./user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      message: "Users retrieved",
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

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.tokenData.id;
    const user = await User.findOne({ _id: userId }).select("-password");

    console.log(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your profile doesn't exist",
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
      message: "Profile can't be retrieved",
      error: error.message,
    });
  }
};
