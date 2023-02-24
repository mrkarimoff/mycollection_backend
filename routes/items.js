const router = require("express").Router();
const Item = require("../models/item");
const validateToken = require("../authorization/validateToken");
const Collection = require("../models/collection");
const Tag = require("../models/tag");

router.get("/collections/:colId/data", validateToken, (req, res) => {
  try {
    Collection.findOne({ _id: req.params.colId }, (err, collection) => {
      if (err) return res.status(500).send({ message: "Something happened in the Database" });
      res
        .status(200)
        .send({ customFields: collection.customFields, collectionName: collection.collectionName });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/tags", validateToken, (_, res) => {
  try {
    Tag.find({}, (err, tags) => {
      if (err) return res.status(500).send({ message: "Something happened in the Database" });
      res.status(200).send(tags);
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/items", validateToken, async (req, res) => {
  const itemData = {
    ...req.body,
    text1: req.body.text1 ?? null,
    text2: req.body.text2 ?? null,
    text3: req.body.text3 ?? null,
    number1: req.body.number1 ?? null,
    number2: req.body.number2 ?? null,
    number3: req.body.number3 ?? null,
    checkbox1: req.body.checkbox1 ?? null,
    checkbox2: req.body.checkbox2 ?? null,
    checkbox3: req.body.checkbox3 ?? null,
    date1: req.body.date1 ?? null,
    date2: req.body.date2 ?? null,
    date3: req.body.date3 ?? null,
    textarea1: req.body.textarea1 ?? null,
    textarea2: req.body.textarea2 ?? null,
    textarea3: req.body.textarea3 ?? null,
  };

  try {
    req.body.tags.map(async (tag) => {
      const dbTag = await Tag.findOne({ name: tag });
      if (!dbTag) {
        await new Tag({ name: tag }).save();
      }
    });
    await new Item({ ...itemData }).save();
    res.status(201).send({ message: "Item created successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/collections/:colId/items", validateToken, (req, res) => {
  try {
    Item.find({ collectionId: req.params.colId }, (err, items) => {
      if (err) return res.status(500).send({ message: "Something happened in the Database" });
      res.status(200).send(items);
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/items/:itemId", validateToken, (req, res) => {
  try {
    Item.findOneAndDelete({ _id: req.params.itemId }, (err, _) => {
      if (err) return res.status(500).send({ message: "Something happened in the Database" });
      res.status(200).send({ message: "Item deleted successfully" });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/items/:itemId", validateToken, (req, res) => {
  try {
    req.body.tags.map(async (tag) => {
      const dbTag = await Tag.findOne({ name: tag });
      if (!dbTag) {
        await new Tag({ name: tag }).save();
      }
    });
    Item.updateOne({ _id: req.params.itemId }, { $set: req.body }, (err, _) => {
      if (err) return res.status(500).send({ message: "Something happened in the Database" });
      res.status(200).send({ message: "Item Updated Successfully!" });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;