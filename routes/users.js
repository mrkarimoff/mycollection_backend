const router = require("express").Router();
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "This email is already in use!" });

    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    await new User({ ...req.body, password: hashedPassword, role: "User", status: 1 }).save();
    res.status(201).send({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
