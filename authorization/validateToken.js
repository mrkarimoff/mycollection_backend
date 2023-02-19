const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  if (req?.headers?.authorization) {
    const accessToken = req.headers.authorization.split(" ")[1];

    try {
      const tokenDetails = verify(accessToken, process.env.JWTSECRET);
      if (tokenDetails) {
        req.authenticated = tokenDetails;
        return next();
      }
    } catch (error) {
      return res.status(401).send({ message: "User is not authorized" });
    }
  }
};

module.exports = validateToken;
