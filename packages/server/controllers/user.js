const User = require("../models/user");
const { getLastMessage } = require("./message");

// get single user
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorResponse("User not found with the id of " + req.params.id, 404)
      );
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.getFriends = async (req, res, next) => {
  const currentUser = req.user._id;

  try {
    const user = await User.find({
      _id: {
        $ne: currentUser.toString(),
      },
    });
    if (!user) {
      return next(new ErrorResponse("User not found."));
    }

    // const filterUser = () => {
    //   return user.filter(
    //     (usr) => usr._id.toString() !== currentUser.toString()
    //   );
    // };

    // const filteredUser = filterUser();

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.getFriendsWithLastMessage = async (req, res, next) => {
  const currentUser = req.user._id;
  let fnd_msg = [];

  try {
    const friends = await User.find({
      _id: {
        $ne: currentUser.toString(),
      },
    });
    if (!friends) {
      return next(new ErrorResponse("User not found."));
    }

    for (let i = 0; i < friends.length; i++) {
      let lmsg = await getLastMessage(
        currentUser.toString(),
        friends[i]._id.toString()
      );
      fnd_msg = [
        ...fnd_msg,
        {
          fndInfo: friends[i],
          msgInfo: lmsg,
        },
      ];
      console.log(fnd_msg);
    }

    res.status(200).json({ success: true, data: fnd_msg });
  } catch (err) {
    next(err);
  }
};

