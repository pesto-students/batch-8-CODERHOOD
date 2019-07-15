import { findOne } from '../../Repositories/genericRepository';

const getExistingUser = async (model, email) => {
  try {
    const user = await findOne(model, { email });
    return user;
  } catch (error) {
    return false;
  }
};

export default getExistingUser;
