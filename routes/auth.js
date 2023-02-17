const router = require("express").Router();
const Joi = require("joi");
const { User, generateAuthToken } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "User with this email doesn't exist" });
    if (user.status === 0)
      return res.status(409).send({ message: "User has been blocked by admin" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Password is incorrect" });

    const accessToken = generateAuthToken(user);
    res.status(200).send({
      data: accessToken,
      username: user.username,
      message: "Logged in successfully!",
      role: user.role,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = router;
