const create = (model, data) => model.create({ ...data });

const count = model => model.countDocuments();

const findOne = async (model, data) => {
  const result = await model.findOne({ _id: data }).lean();
  return result;
};

const findMany = async (model, data, skip, limit) => {
  const foundData = await model.find({ ...data }, undefined, {
    limit: Number(limit),
    skip: Number(skip),
  });
  const counts = await count(model);
  const result = { counts, data: [...foundData] };
  if (!result) {
    const error = {
      error: 'No Data Found',
      message: 'No data present in DB',
      status: 400,
    };
    throw error;
  }
  return result;
};

const deleteDoc = async (model, data) => {
  try {
    return model.findOneAndRemove({ _id: data });
  } catch (error) {
    throw error;
  }
};

const update = async (model, id, updatedData) => {
  try {
    const result = await model.findOneAndUpdate(
      { _id: id },
      updatedData,
      { new: true },
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export {
  create,
  findOne,
  findMany,
  deleteDoc,
  update,
  count,
};