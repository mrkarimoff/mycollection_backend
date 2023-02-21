const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  collectionImg: { type: String },
  collectionName: { type: String, required: true },
  customFields: [mongoose.Schema.Types.Mixed],
  description: { type: String, required: true },
  topic: { type: String, required: true },
  userId: { type: String, required: true },
});

const Collection = mongoose.model("collection", CollectionSchema);

module.exports = Collection;
