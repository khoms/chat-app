const express = require("express");

const { getUser } = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const router = new express.Router();

router.get("/:id", isAuthenticatedUser, getUser);

module.exports = router;
