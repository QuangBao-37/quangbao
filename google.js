const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Thay thế CLIENT_ID và CLIENT_SECRET bằng thông tin thật
const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const CLIENT_SECRET = "YOUR_GOOGLE_CLIENT_SECRET";

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  const user = {
    id: profile.id,
    displayName: profile.displayName,
    email: profile.emails?.[0]?.value
  };

  const filePath = path.join(__dirname, "..", "users.json");
  let users = [];

  if (fs.existsSync(filePath)) {
    users = JSON.parse(fs.readFileSync(filePath));
  }

  if (!users.find(u => u.id === user.id)) {
    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }

  done(null, user);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/home"
  })
);

module.exports = router;
