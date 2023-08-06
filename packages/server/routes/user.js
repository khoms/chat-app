const express = require("express");

const { getUser, getFriends } = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const router = new express.Router();

router.get("/:id", isAuthenticatedUser, getUser);
router.get("/", isAuthenticatedUser, getFriends);


module.exports = router;
