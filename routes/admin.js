const router = require("express").Router();
const validateToken = require("../authorization/validateToken");
const { User } = require("../models/user");

router.get("/users", validateToken, (req, res) => {
  const { role } = req.authenticated;

  if (role === "Admin") {
    User.find({}, (err, users) => {
      if (err) return res.status(500).send({ message: "Error has occurred in DB" });

      res.status(200).send(users);
    });
  } else {
    res.status(409).send({ message: "User doesn't have admin rights" });
  }
});

router.put("/users", validateToken, (req, res) => {
  const { _id, role } = req.authenticated;
  if (role === "Admin") {
    const criteria = {
      _id: { $in: req.query.ids },
    };

    User.updateMany(criteria, req.body, { multi: true }, (err, result) => {
      if (err) return res.status(500).send({ message: "Error has occured in DB" });
      if (result) {
        User.find(criteria, (err, users) => {
          if (err) return res.status(500).send({ message: "Error has occured in DB" });

          res.status(200).send({ users, adminId: _id });
        });
      }
    });
  } else {
    res.status(409).send({ message: "User doesn't have admin rights" });
  }
});

router.delete("/users", validateToken, (req, res) => {
  const { _id, role } = req.authenticated;
  if (role === "Admin") {
    const criteria = {
      _id: { $in: req.query.ids },
    };

    User.find(criteria, (err, users) => {
      if (err) return res.status(500).send({ message: "Error has occured in DB" });

      User.deleteMany(criteria, (err, result) => {
        if (err) return res.status(500).send({ message: "Error has occured in DB" });
        if (result) {
          res.status(200).send({ users, adminId: _id });
        }
      });
    });
  } else {
    res.status(409).send({ message: "User doesn't have admin rights" });
  }
});

module.exports = router;
