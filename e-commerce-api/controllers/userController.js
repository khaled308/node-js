import {
  create,
  deleteItem,
  getAll,
  getOne,
  update,
} from "../utils/controllerFactory.js";
import User from "../models/User.js";

export const createUser = create(User);

export const getUsers = getAll(User);

export const getUser = getOne(User);

export const updateUser = update(User);

export const updateUserPassword = update(User);

export const deleteUser = deleteItem(User);
