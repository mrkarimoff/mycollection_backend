// Finds the most repeated 8 collectionIds
/*
db.items.aggregate([
  { $group: { _id: "$collectionId", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 8 },
]); 
 */

// Counts items collection's documents
// db.items.aggregate([{ $group: { _id: "$collectionId", count: { $count: {} } } }]);

// Atlas search aggrate pipline
/*
const pipline = [
  {
    $search: {
      index: "searchIndex1",
      text: {
        query: req.query.term,
        path: {
          wildcard: "*",
        },
      },
      highlight: {
        path: {
          wildcard: "*",
        },
      },
    },
  },
  {
    $addFields: {
      highlights: {
        $meta: "searchHighlights",
      },
    },
  },
  {
    $limit: 7,
  },
]; 
 */

// Possible change
/*
router.get("/collections/:colId/data", validateToken, (req, res) => {
  const { _id, role } = req.authenticated;
  try {
    Collection.findOne({ _id: req.params.colId }, (err, collection) => {
      if (err) return res.status(500).send({ message: "Something happened in the Database" });
      res.status(200).send({
        customFields: collection.customFields,
        collectionName: collection.collectionName,
        canManage: collection.userId === _id || role==="Admin",
      });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}) 
 */
