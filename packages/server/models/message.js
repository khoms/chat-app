const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: [true, "Sender Id is required"],
    },
    recieverId: {
      type: String,
      required: [true, "Reciever Id is required"],
    },
    message: {
      text: {
        type: String,
        default: "",
      },
      image: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        default: "unseen",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
