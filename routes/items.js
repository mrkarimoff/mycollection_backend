const router = require("express").Router();
const Item = require("../models/item");
const validateToken = require("../authorization/validateToken");
const Collection = require("../models/collection");

router.get("/collections/:colId/custom-fields", validateToken, (req, res) => {
  try {
    Collection.findOne({ _id: req.params.colId }, (err, result) => {
      if (err) return res.status(500).send({ message: "Something happened in the Database" });
      res.status(200).send({ customFields: result.customFields });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
