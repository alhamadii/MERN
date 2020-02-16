const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth"); // we add it to protect the route
const Profile = require("../../models/Profile");
const User = require("../../models/User");
// @toute  GET api/profile/me
// @desc   Get current user profile
// @access Private
// router.get("/", auth, (req, res) => res.send("Profile route")); // we add auth as second param
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Ther is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    ReadableStream.status.send("Server Error");
  }
}); // we add auth as second param

module.exports = router;
