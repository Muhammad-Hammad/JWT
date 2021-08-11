const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(403).send({
      message: "Token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY, () =>
      console.log("token verified!")
    );

    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      message: "Invalid Token",
    });
  }
  return next();
};
module.exports = verifyToken;
