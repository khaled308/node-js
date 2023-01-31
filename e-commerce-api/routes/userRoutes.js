import { Router } from "express";
import {
  createUserData,
  updateUserData,
  userPassword,
} from "../middleware/userMiddleware.js";
import {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController.js";
import {
  registerValidator,
  updateUserPasswordValidator,
  updateUserValidator,
} from "../validators/userValidator.js";
import { imagesProcess, upload } from "../middleware/file-upload.js";
import { isAdmin, isAuthorized } from "../middleware/auth.js";

const userRoutes = Router();

userRoutes
  .route("/")
  .post(
    upload.single("image"),
    imagesProcess,
    isAdmin,
    registerValidator,
    createUserData,
    createUser
  )
  .get(getUsers);

userRoutes
  .route("/:id")
  .get(isAuthorized, getUser)
  .put(isAuthorized, updateUserValidator, updateUserData, updateUser)
  .delete(isAuthorized, deleteUser);

userRoutes.put(
  "/:id/change-password",
  isAuthorized,
  updateUserPasswordValidator,
  userPassword,
  updateUserPassword
);
export default userRoutes;
