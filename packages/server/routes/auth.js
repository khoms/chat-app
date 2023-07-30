const express = require("express");

const { register, userLogin } = require("../controllers/auth");

const router = new express.Router();

router.route("/register").post(register);
router.route("/userLogin").post(userLogin);

module.exports = router;
