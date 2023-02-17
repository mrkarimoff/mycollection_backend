const mongoose = require("mongoose");

module.exports = () => {
  try {
    mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
    console.log("could not connnected to DB");
  }
};
