const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "welcome"
  });
});

router.use("/student", require("./student"));
router.use("/staff", require("./staff"));
router.use("/admin", require("./admin"));
module.exports = router;
