const express = require("express");
const {
  getAllTestimoni,
  findTestimoni,
  createTestimoni,
  removeTestimoni,
} = require("../controllers/testimonial");
const authentication = require("../middlewares/auth");
const router = express.Router();

router.get("/", getAllTestimoni);
router.get("/:id", findTestimoni);
router.post("/", createTestimoni);
router.use(authentication);
router.delete("/delete/:id", removeTestimoni);

module.exports = router;
