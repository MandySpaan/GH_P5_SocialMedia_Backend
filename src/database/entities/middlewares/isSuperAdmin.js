export const isSuperAdmin = async (req, res, next) => {
  try {
    if (req.tokenData.role !== "super_admin") {
      return res.json({
        success: false,
        message: "You're not authorized to do this",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Super admin authentication error",
      error: error.message,
    });
  }
};
