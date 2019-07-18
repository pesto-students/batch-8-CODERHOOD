import { userModel } from '../Model';
import {
  getUser,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from '../Controller/User/UserController';
import testDb from './testDbSetup';

const mockRequest = body => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const next = (err) => {
  throw err;
};

let db;

beforeAll(async (done) => {
  db = testDb;
  userModel.deleteMany({}, (err) => {
    if (err) {
      throw err;
    }
  });
  done();
});

afterAll((done) => {
  db.close();
  done();
});

describe('Test api/user endpoints', () => {
  test('post(/) - createUser should return with status 201', async () => {
    const user = {
      name: 'bobby',
      email: 'bob@mail.com',
      password: 'pass1',
    };

    const req = mockRequest({ ...user });
    const res = mockResponse();

    await createUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('get(/:id) - getUser should return a user with given id', async () => {
    const testUser = await userModel.findOne({ name: 'bobby' }).lean();
    const { _id } = testUser;
    const req = {
      params: {
        id: _id,
      },
    };
    const res = mockResponse();

    await getUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send.mock.calls[0][0]).toMatchObject({
      data: {
        _id,
        name: 'bobby',
        email: 'bob@mail.com',
        __v: 0,
      },
      message: 'User is here',
    });
  });

  test('get(/) - getAllUsers should return the list of users', async () => {
    // create Another user for testing
    const user2 = {
      name: 'john',
      email: 'john@mail.com',
      password: 'password',
    };

    const tempReq = mockRequest({ ...user2 });
    const tempRes = mockResponse();

    await createUser(tempReq, tempRes, next);

    const req = mockRequest();
    const res = mockResponse();

    const result = [
      {
        name: 'bobby',
        email: 'bob@mail.com',
      },
      {
        name: user2.name,
        email: user2.email,
      },
    ];

    await getAllUsers(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    // Because _id cannot be known.
    expect(res.send.mock.calls[0][0]).toMatchObject({
      data: {
        counts: 2,
        data: result,
      },
      message: 'Users are here',
    });
  });

  test('delete(/:id) - deleteUser should remove the user with given Id', async () => {
    const testUser = await userModel.findOne({ name: 'bobby' });
    const { _id } = testUser;
    const req = {
      params: {
        id: _id,
      },
    };
    const res = mockResponse();

    await deleteUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send.mock.calls[0][0]).toMatchObject({
      data: {
        name: 'bobby',
        email: 'bob@mail.com',
        __v: 0,
        _id,
      },
      message: 'User deleted successfully',
    });
  });

  test('put(/) - updateUser should update the data of the given user', async () => {
    const testUser = await userModel.findOne({ name: 'john' });
    const { _id } = testUser;
    const req = {
      body: {
        id: _id,
        dataToUpdate: {
          email: 'newjohn@gmail.com',
        },
      },
    };
    const res = mockResponse();

    await updateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send.mock.calls[0][0]).toMatchObject({
      data: {
        name: 'john',
        email: 'newjohn@gmail.com',
        __v: 0,
        _id,
      },
      message: 'User updated successfully',
    });
  });
});
