const express = require("express");
const router = express.Router();
const { adminReg, login } = require("../controllers/admin");

router.post("/register", adminReg);
router.post("/login", login);

module.exports = router;
