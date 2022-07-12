const express = require("express");
const adminRoutes = require("./admin");
const testimoniRoutes = require("./testimonial");
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/testimoni", testimoniRoutes);

module.exports = router;
