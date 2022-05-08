const express = require("express");
const router = express.Router();

router.post("/register");
router.post("/login");
router.delete("/delete");
router.edit("/edit");

module.exports = router;
