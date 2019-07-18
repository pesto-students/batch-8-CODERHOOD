import { findOne, updateArrayField } from '../Repositories/genericRepository';

const updateMembers = async (
  req,
  res,
  next,
  model,
  notFoundResponse,
  updateResponse,
  successHandler,
) => {
  try {
    const { operation, id, memberId } = req.body;
    const channel = await findOne(model, { _id: id });
    if (!channel) {
      const error = new Error(notFoundResponse);
      error.status(400);
      return next(error);
    }
    const result = await updateArrayField(model, operation, id, memberId);
    return res
      .status(200)
      .send(successHandler(updateResponse, result));
  } catch (error) {
    return next(error);
  }
};

export default updateMembers;
