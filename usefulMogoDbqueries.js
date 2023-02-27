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
