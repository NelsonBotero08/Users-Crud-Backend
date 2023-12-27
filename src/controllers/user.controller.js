const catchError = require("../utils/catchError");
const User = require("../models/User");

const getAll = catchError(async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

const createUser = catchError(async (req, res) => {
  const { first_name, last_name, email, password, birthday, image_url } =
    req.body;
  const user = await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    birthday: birthday,
    image_url: image_url,
  });
  return res.status(201).json(user);
});

const userById = catchError(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  return res.json(user);
});

const deletedUser = catchError(async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  return res.sendStatus(204);
});

const updateUser = catchError(async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password, birthday, image_url } =
    req.body;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const updatedUser = await user.update({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    birthday: birthday,
    image_url: image_url,
  });

  return res.json(updatedUser);
});

module.exports = {
  getAll,
  createUser,
  userById,
  deletedUser,
  updateUser,
};
