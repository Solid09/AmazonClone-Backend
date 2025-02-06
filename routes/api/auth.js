const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../../models/user.js");
const Profile = require("../../models/profile.js");
const { createToken } = require("../../middleware/auth.js");

router.post("/register", async (req, res) => {
  try {
    console.log("Request made to register!");

    const user = req.body.user;
    const userProf = req.body.userProf;

    if (!user || !userProf) {
      return res
        .status(400)
        .json({ success: false, message: "Data not complete!" });
    }

    const hashedPassword = await bcryptjs.hash(user.password, 10);

    const newUser = new User({
      email: user.email,
      password: hashedPassword,
      fullName: user.fullName,
    });
    const _user = await newUser.save();

    const userProfile = new Profile({
      image: userProf.imageurl,
      fullName: user.fullName,
      gender: userProf.gender,
      dateOfBirth: userProf.dateofBirth,
      contactInfo: userProf.contactInfo,
      user: _user._id,
    });
    await userProfile.save();

    const token = createToken(_user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
      path: "/",
    });

    return res
      .status(200)
      .json({ success: true, message: "User Created!", token: token, userId: _user._id });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.post("/verifyEmail", async (req, res) => {
  try {
    console.log("Request made to verify email!");

    const emailValidationKey = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNoValidationKey = /^\+?92?\d{10,15}$/;

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not complete or not in correct format!",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "There is no account associated with the given email!",
      });
    } else {
      return res.status(200).json({ success: true, message: "Email Found!" });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("Request made to login!");

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "Data not complete!" });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "No user found for this email address." });
    }

    const isSame = await bcryptjs.compare(password, existingUser.password);

    if (!isSame) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong password!" });
    } else {
      const token = createToken(existingUser._id);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        path: "/",
      });

      return res.status(200).json({
        success: true,
        token: token,
        userId: existingUser._id,
        message: "Logged in successfully!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    console.log("Request made to logout!");

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ success: true, message: "logged out successfully!" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

module.exports = router;
