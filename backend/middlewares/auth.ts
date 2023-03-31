const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (request, response, next: () => void) => {
  const token: string =
    request.body.token ||
    request.query.token ||
    request.headers["x-access-token"];

  if (!token) {
    return response.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    request.user = decoded;
  } catch (error) {
    return response.status(401).send("Invalid token");
  }
  return next();
};

module.exports = verifyToken;
