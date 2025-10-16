const router = require("express").Router();
const clothingItem = require("./clothingItem");
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const auth = require("../middlewares/auth");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);

// router.use(auth);
router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(404).json({ message: "Router not found" });
});

module.exports = router;
