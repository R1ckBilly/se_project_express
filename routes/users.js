const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
