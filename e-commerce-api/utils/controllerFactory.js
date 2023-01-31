import expressAsyncHandler from "express-async-handler";
import ApiFeatures from "../utils/ApiFeatures.js";

export const create = (Model) =>
  expressAsyncHandler(async (req, res) => {
    const data = await Model.create(req.data);

    res.send(data);
  });

export const getAll = (Model) =>
  expressAsyncHandler(async (req, res) => {
    //query --> price[gte]=50

    const count = await Model.count();
    const mongoQuery = Model.find();
    const apiFeatures = new ApiFeatures(req.query, mongoQuery);

    apiFeatures.filter().paginate(count).sort().search().select();
    const { pagination } = apiFeatures;

    const data = await mongoQuery;
    res.send({ data, pagination });
  });

export const getOne = (Model) =>
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await Model.findById(id);

    if (!data) return res.status(404).send({ message: "Not Found" });

    res.send(data);
  });

export const update = (Model) =>
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await Model.findByIdAndUpdate(id, req.data, {
      new: true,
    });

    if (!data) return res.status(404).send({ message: "Not Found" });

    res.send(data);
  });

export const deleteItem = (Model) =>
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await Model.findByIdAndDelete(id);

    if (!data) return res.status(404).send({ message: "Not Found" });

    res.send(data);
  });
