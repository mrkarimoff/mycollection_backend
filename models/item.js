const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  collectionId: { type: String, required: true },
  itemName: { type: String, required: true },
  tags: { type: [], required: true },
  text1: { type: String },
  text2: { type: String },
  text3: { type: String },
  number1: { type: Number },
  number2: { type: Number },
  number3: { type: Number },
  checkbox1: { type: Boolean },
  checkbox2: { type: Boolean },
  checkbox3: { type: Boolean },
  date1: { type: String },
  date2: { type: String },
  date3: { type: String },
  textarea1: { type: String },
  textarea2: { type: String },
  textarea3: { type: String },
  itemDate: { type: String },
  likes: { type: [{ userId: String }] },
  comments: {
    type: [{ username: String, comment: String, userId: String, date: String }],
  },
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
