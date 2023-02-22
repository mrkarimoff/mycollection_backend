const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  collectionId: { type: String, required: true },
  itemName: { type: String, required: true },
  tags: { type: [mongoose.Schema.Types.Mixed], required: true },
  text1: { type: String, required: true },
  text2: { type: String, required: true },
  text3: { type: String, required: true },
  number1: { type: Number, required: true },
  number2: { type: Number, required: true },
  number3: { type: Number, required: true },
  checkbox1: { type: Boolean, required: true },
  checkbox2: { type: Boolean, required: true },
  checkbox3: { type: Boolean, required: true },
  date1: { type: String, required: true },
  date2: { type: String, required: true },
  date3: { type: String, required: true },
  textarea1: { type: String, required: true },
  textarea2: { type: String, required: true },
  textarea3: { type: String, required: true },
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
