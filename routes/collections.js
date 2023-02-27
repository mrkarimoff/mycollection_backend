const router = require("express").Router();
const validateToken = require("../authorization/validateToken");
const Collection = require("../models/collection");
const Item = require("../models/item");
const { User } = require("../models/user");
const namedCustomFields = require("../utils/nameAdder");

router.post("/collections", validateToken, (req, res) => {
  const { _id } = req.authenticated;
  try {
    const urlParams = req.body.urlParams;
    User.findById(urlParams, async (_, result) => {
      const collectionData = {
        ...req.body,
        customFields: namedCustomFields(req.body.customFields),
        userId: result ? urlParams : _id,
      };
      await new Collection(collectionData).save();
      res.status(201).send({ message: "Collection created successfully!" });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/collections/:urlParams", validateToken, async (req, res) => {
  const { _id } = req.authenticated;
  try {
    const countCols = await Item.aggregate([
      { $group: { _id: "$collectionId", count: { $count: {} } } },
    ]);
    const urlParams = req.params.urlParams;
    User.findById(urlParams, (_, result) => {
      Collection.find({ userId: result ? urlParams : _id }, (err, collections) => {
        if (err) return res.status(500).send({ message: "Something happened in the Database" });
        res.status(200).send({ collections, ...(countCols && { countCols }) });
      });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/collections/count/biggest", async (_, res) => {
  try {
    const mostRepeatedCols = await Item.aggregate([
      { $group: { _id: "$collectionId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]);
    const mostRepeatedColIds = mostRepeatedCols?.map((col) => col._id);
    const criteria = {
      _id: { $in: mostRepeatedColIds },
    };

    Collection.find(criteria, (err, collections) => {
      if (err) return res.status(500).send({ message: "Something happened in the Database" });
      res.status(200).send({ collections, mostRepeatedCols });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/collections/:colId", validateToken, (req, res) => {
  try {
    const colId = req.params.colId;
    Collection.findOneAndDelete({ _id: colId }, (err, _) => {
      if (err) return res.status(500).send({ message: "Something happened in the Database" });
      Item.deleteMany({ collectionId: colId }, (err, _) => {
        if (err) return res.status(500).send({ message: "Something happened in the Database" });
      });
      res.status(200).send({ message: "Collection deleted successfully!" });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/collections/:colId", validateToken, (req, res) => {
  const { _id } = req.authenticated;
  const colId = req.params.colId;
  const urlParams = req.body.urlParams;

  try {
    User.findById(urlParams, (_, result) => {
      const collectionData = {
        ...req.body,
        customFields: namedCustomFields(req.body.customFields),
        userId: result ? urlParams : _id,
      };
      Collection.updateOne({ _id: colId }, { $set: collectionData }, (err, _) => {
        if (err) return res.status(500).send({ message: "Something happened in the Database" });
        res.status(200).send({ message: "Collection Updated Successfully!" });
      });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
