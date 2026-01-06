const express = require("express");
const router = express.Router();
const { createAward, getAwards } = require("../controllers/awardController");

router.post("/", createAward);
router.get("/", getAwards);

module.exports = router;
