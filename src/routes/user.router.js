const {
  getAll,
  createUser,
  deletedUser,
  updateUser,
  userById,
} = require("../controllers/user.controller");
const express = require("express");

const userRouter = express.Router();

userRouter.route("/users").get(getAll).post(createUser);
userRouter
  .route("/users/:id")
  .get(userById)
  .delete(deletedUser)
  .put(updateUser);

module.exports = userRouter;
