const router = require("express").Router();
const { verifyToken } = require("../../middleware/auth.js");
const User = require("../../models/user.js");
const Profile = require("../../models/profile.js");
const bcryptjs = require("bcryptjs");
const checkRole = require('../../config/role.js');

router.get("/me", verifyToken, checkRole("user"), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No User Found!" });
    }

    const _user = {
      email: user.email,
      fullName: user.fullName,
      dateCreated: user.dateCreated,
      dateUpdated: user.dateUpdated,
    };

    return res.status(200).json({
      success: true,
      user: _user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.get('/', verifyToken, checkRole("admin"), async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No Users Found!",
      });
    }

    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.get("/profile/me", verifyToken, checkRole("user"), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "No User Found!",
      });
    }

    return res.status(200).json({
      success: true,
      profile: profile,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.patch("/me", verifyToken, checkRole("user"), async (req, res) => {
  try {
    const user = req.body;
    await User.findOneAndUpdate(
      { _id: req.user.userId },
      {
        $set: {
          email: user.email,
          fullName: user.fullName,
          dateUpdated: Date.now(),
        },
      }
    );

    return res.status(200).json({ success: true, message: "User updated!" });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.patch("/changePassword", verifyToken, checkRole("user"), async (req, res) => {
  try {
    const password = req.body.password;

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Kindly give password!" });
    }

    const hashedpassword = await bcryptjs.hash(password, 10);

    await User.findOneAndUpdate(
      { _id: req.user.userId },
      {
        $set: {
          password: hashedpassword,
          dateUpdated: Date.now(),
        },
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "Password updated!" });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.delete("/me", verifyToken, checkRole("user"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "User with id: " + req.user.userId + ", is deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

module.exports = router;
