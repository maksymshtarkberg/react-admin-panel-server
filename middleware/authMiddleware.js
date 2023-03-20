const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (request, response, next) {
  if (request.method === "OPTIONS") {
    next();
  }

  try {
    const token = request.headers.authorization.split(" ")[1];
    if (!token) {
      return response.status(403).json("User didn`t step up authorization");
    }
    const decodedData = jwt.verify(token, secret);
    request.user = decodedData;
    next();
  } catch (errors) {
    console.log(errors);
    return response.status(403).json("User didn`t step up authorization");
  }
};
