const express = require("express");
const router = express.Router();

const USER = process.env.LOCAL_USER || "admin";
const PASS = process.env.LOCAL_PASS || "123456";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER && password === PASS) {
    req.session.user = { username };
    return res.redirect("/home");
  }

  res.send("<h2>Đăng nhập thất bại! Sai tài khoản hoặc mật khẩu.</h2><a href='/'>Thử lại</a>");
});

module.exports = router;
