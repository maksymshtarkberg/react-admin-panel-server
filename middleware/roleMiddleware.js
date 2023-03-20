const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (roles) {
  return function (request, response, next) {
    if (request.method === "OPTIONS") {
      next();
    }

    try {
      const token = request.headers.authorization.split(" ")[1];
      if (!token) {
        return response.status(403).json("User didn`t step up authorization");
      }
      const { roles: userRoles } = jwt.verify(token, secret);
      let hasRoles = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRoles = true;
        }
      });
      if (!hasRoles) {
        return response.status(403).json("Dont have access");
      }
      next();
    } catch (errors) {
      console.log(errors);
      return response.status(403).json("User didn`t step up authorization");
    }
  };
};
