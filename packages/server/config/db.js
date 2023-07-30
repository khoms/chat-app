const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const link = process.env.DB_LINK;
    const conn = await mongoose.connect(link, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`Database connected ${conn.connection.host}`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
