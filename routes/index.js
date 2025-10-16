const router = require("express").Router();
const clothingItem = require("./clothingItem");
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
// const auth = require("../middlewares/auth");
const errors = require("../errors");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/not-found-err");

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);

// router.use(auth);
router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res, next) => {
 return next(new NotFoundError("Page not found"));
});

module.exports = router;
