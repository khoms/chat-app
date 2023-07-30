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
        text: chat,
        imaeg: "",
      },
    });
    res.status(201).json({ success: true, data: insertChat });
  } catch (err) {
    next(err);
  }
};

//Route GET/messages
exports.getMessage = async (req, res, next) => {
  const myId = req.user._id;
  const fId = req.params.id;

  try {
    const messages = await message.find({});

    filterChat = messages.filter(
      (msg) =>
        (msg.senderId === myId && msg.recieverId === fId) ||
        msg.recieverId === myId ||
        msg.senderId === fId
    );

    res.status(200).json({
      success: true,
      count: messages.lenghts,
      data: messages,
    });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
  // res.status(200).json({success:true,msg:'Show all appointments'});
};
