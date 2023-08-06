const message = require("../models/message");

//Route to create messages
exports.createMessage = async (req, res, next) => {
  const myId = req.user._id;
  const { senderName, recieverId, chat } = req.body;
  try {
    const insertChat = await message.create({
      senderId: myId,
      recieverId,
      senderName,
      message: {
        text: chat.text,
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

    const messages = await message.find({
      $or: [
        { $and: [{ senderId: myId }, { receiverId: fId }] },
        { $and: [{ senderId: fId }, { receiverId: myId }] },
      ],
    });

    // const filterChat = messages.filter((msg) => {

    //   return (
    //     (msg.senderId === myId && msg.recieverId === fId) ||
    //     (msg.recieverId === myId && msg.senderId === fId)
    //   );
    // });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
  // res.status(200).json({success:true,msg:'Show all appointments'});
};
