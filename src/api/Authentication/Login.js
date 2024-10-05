const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../../Model/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post(
  "/login",
  [body("username", "Username is required").not().isEmpty(), body("password", "At least 6 characters").exists()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });

      if (!existingUser) return res.status(401).json({ errors: [{ msg: "Wrong username or password" }] });

      const passwordCorrect = await bcrypt.compare(password, existingUser.password);

      if (!passwordCorrect) {
        return res.status(401).json({ msg: "Wrong email or password" });
      }

      const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);

      //send cookies in httpOnly

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send();
      res.status(200).json("Success");
    } catch (err) {
      res.status(500);
    }
  }
);

module.exports = router;
