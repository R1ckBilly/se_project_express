const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  login,
} = require("../controllers/users");



module.exports = router;
