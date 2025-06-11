const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Thay thế bằng thông tin thật
const FB_APP_ID = process.env.FB_APP_ID || "YOUR_FB_APP_ID";
const FB_APP_SECRET = process.env.FB_APP_SECRET || "YOUR_FB_APP_SECRET";

passport.use(new FacebookStrategy({
  clientID: FB_APP_ID,
  clientSecret: FB_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ["id", "displayName", "emails"]
}, (accessToken, refreshToken, profile, done) => {
  const user = {
    id: profile.id,
    displayName: profile.displayName,
    email: profile.emails?.[0]?.value || "No email"
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

router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    successRedirect: "/home"
  })
);

module.exports = router;
