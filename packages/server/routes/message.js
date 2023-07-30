const express = require("express");

const { getMessage, createMessage } = require("../controllers/message");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const router = new express.Router();

router.get("/:id", isAuthenticatedUser, getMessage);
router.post("/", isAuthenticatedUser, createMessage);

module.exports = router;
