const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../Model/UserSchema");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    done(null, id);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        if (!email || !password)
          done(new Error("Bad Request.Missing credentials"), null);
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          console.log("Authenticated Successfully");
          done(null, user);
        } else {
          console.log("Invalid Authentication");
          done(null, null);
        }
      } catch (err) {
        console.log(err);
        done(null, null);
      }
    }
  )
);
