const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./auth/google");
const fbRoutes = require("./auth/facebook");
const localRoutes = require("./routes_local");
const path = require("path");

const app = express();
const PORT = 3000;

require("dotenv").config();
require("./auth/google");

app.use(express.static("public"));
app.use(session({ secret: "mysecret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/", fbRoutes);
app.use("/", localRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "views", "home.html"));
  } else {
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
