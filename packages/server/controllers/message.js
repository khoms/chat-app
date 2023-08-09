const Message = require("../models/message");

//Route to create messages
exports.createMessage = async (req, res, next) => {
  const myId = req.user._id;
  const { senderName, recieverId, message } = req.body;
  try {
    const insertChat = await Message.create({
      senderId: myId,
      recieverId,
      senderName,
      message: {
        text: message.text,
        image: "",
      },
    });
    res.status(201).json(insertChat);
  } catch (err) {
    next(err);
  }
};

//Route GET/messages
exports.getMessage = async (req, res, next) => {
  const myId = req.user._id.toString();
  const fId = req.params.id;

  try {
    // const filterChat = await message.find({

    // });

    const messages = await Message.find({
      $or: [
        {
          $and: [
            {
              senderId: {
                $eq: myId,
              },
            },
            {
              recieverId: {
                $eq: fId,
              },
            },
          ],
        },

        {
          $and: [
            {
              senderId: {
                $eq: fId,
              },
            },
            { recieverId: { $eq: myId } },
          ],
        },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

exports.getLastMessage = async (myId, fId) => {
  const msg = await Message.find({
    $or: [
      {
        $and: [
          {
            senderId: {
              $eq: myId,
            },
          },
          {
            recieverId: {
              $eq: fId,
            },
          },
        ],
      },

      {
        $and: [
          {
            senderId: {
              $eq: fId,
            },
          },
          { recieverId: { $eq: myId } },
        ],
      },
    ],
  }).sort({ updatedAt: -1 });

  return msg[0];
};
