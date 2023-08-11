const express = require("express");

const {
  getMessage,
  createMessage,
  seenMessage,
} = require("../controllers/message");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const router = new express.Router();

router.get("/:id", isAuthenticatedUser, getMessage);
router.post("/", isAuthenticatedUser, createMessage);
router.post("/seen-message", isAuthenticatedUser, seenMessage);


module.exports = router;
