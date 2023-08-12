const express = require("express");

const {
  getUser,
  getFriends,
  getFriendsWithLastMessage,
  getFriendWithLastMessage,
} = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const router = new express.Router();

router.get("/", isAuthenticatedUser, getFriends);
router.get("/fm", isAuthenticatedUser, getFriendsWithLastMessage);
router.get("/fm/:id", isAuthenticatedUser, getFriendWithLastMessage);
router.get("/:id", isAuthenticatedUser, getUser);



module.exports = router;
