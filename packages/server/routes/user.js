const express = require("express");

const {
  getUser,
  getFriends,
  getFriendsWithLastMessage,
} = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const router = new express.Router();

router.get("/", isAuthenticatedUser, getFriends);
router.get("/fm", isAuthenticatedUser, getFriendsWithLastMessage);
router.get("/:id", isAuthenticatedUser, getUser);



module.exports = router;
