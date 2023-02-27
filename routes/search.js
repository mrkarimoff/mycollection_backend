const router = require("express").Router();
const Collection = require("../models/collection");
const Item = require("../models/item");

router.get("/search", async (req, res) => {
  const piplineItem = [
    {
      $search: {
        index: "searchIndex1",
        text: {
          query: req.query.term,
          path: {
            wildcard: "*",
          },
        },
      },
    },
    {
      $limit: 7,
    },
  ];

  const piplineCollection = [
    {
      $search: {
        index: "collectionsSearch",
        text: {
          query: req.query.term,
          path: ["collectionName", "description", "topic"],
        },
      },
    },
    {
      $limit: 8,
    },
  ];
  const countCols = await Item.aggregate([
    { $group: { _id: "$collectionId", count: { $count: {} } } },
  ]);
  const items = await Item.aggregate(piplineItem);
  const collections = await Collection.aggregate(piplineCollection);

  res.send({ collections, items, countCols });
});

module.exports = router;
