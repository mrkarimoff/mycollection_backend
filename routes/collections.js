const router = require("express").Router();
const validateToken = require("../authorization/validateToken");
const Collection = require("../models/collection");
const { User } = require("../models/user");
const namedCustomFields = require("../utils/nameAdder");

router.post("/collections", validateToken, async (req, res) => {
  const { _id, email, role } = req.authenticated;
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
  const { _id, email, role } = req.authenticated;
  try {
    const urlParams = req.params.urlParams;
    User.findById(urlParams, async (_, result) => {
      Collection.find({ userId: result ? urlParams : _id }, (err, collections) => {
        if (err) return res.status(500).send({ message: "Something happened in the Database" });
        res.status(200).send(collections);
      });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
