const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

router.post(
  "/registration",
  [
    check("username", "Cant be empty").notEmpty(),
    check("password", "Need to be more 6 and less 9 symbols").isLength({
      min: 6,
      max: 9,
    }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

router.get("/activate/:link", controller.activate);
router.get("/refresh", controller.refresh);
router.get("/users", roleMiddleware(["USER"]), controller.getUsers);

module.exports = router;
