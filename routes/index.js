const router = require("express").Router();
const clothingItem = require("./clothingItem");
const {createUser, login} = require("../controllers/users");

const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.post('signin', login);
router.post('/signup', createUser);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
