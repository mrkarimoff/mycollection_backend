const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: Number, required: true },
});

const generateAuthToken = (user) => {
  const accessToken = jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    process.env.JWTSECRET,
    {
      expiresIn: "7d",
    }
  );
  return accessToken;
};

const User = mongoose.model("user", UserSchema);

const validateUser = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validateUser, generateAuthToken };
