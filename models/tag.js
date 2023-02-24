const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Tag = mongoose.model("tag", TagSchema);

module.exports = Tag;
