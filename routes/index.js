const router = require("express").Router();
const clothingItem = require("./clothingItem");
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", clothingItem);

router.use(auth);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
