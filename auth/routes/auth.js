const { register, login } = require("../controllers/auth");
const { registerValidateMiddleware } = require("../validators/auth");

const router = require("express").Router();

router.post("/register", registerValidateMiddleware, register);
router.post("/login", login);

module.exports = router;
