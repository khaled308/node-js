import { hash } from "bcrypt";

const prepareSchema = (data) => {
  const keys = ["name", "email", "phone", "profileImage"];
  const res = {};

  for (let key of keys) {
    if (data[key]) res[key] = data[key];
  }

  return res;
};

const createUserData = (req, res, next) => {
  req.data = prepareSchema(req.body);

  req.data.password = req.body.password;
  next();
};

const updateUserData = (req, res, next) => {
  req.data = prepareSchema(req.body);

  next();
};

const userPassword = async (req, res, next) => {
  req.data = {};
  req.data.password = await hash(req.body.newPassword, 10);

  next();
};
export { createUserData, updateUserData, userPassword };
