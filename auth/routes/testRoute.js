const { verifyToken } = require("../middleware/auth");

const router = require("express").Router();

router.get("/verify-token", verifyToken, (req, res) => {
  res.send("you are authenticated");
});

module.exports = router;
