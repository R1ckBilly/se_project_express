const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUserUpdate, updateCurrentUser);

module.exports = router;
