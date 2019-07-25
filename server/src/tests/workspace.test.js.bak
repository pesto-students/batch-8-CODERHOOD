import { workspaceModel } from '../Model';
import {
  createWorkspace,
  updateWorkspaceMembers,
} from '../Controller/Workspace/WorkspaceController';
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
  workspaceModel.deleteMany({}, (err) => {
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

describe('Test api/workspace endpoints', () => {
  test('put(/member) - updateWorkspaceMember should update the data of the given workspace', async () => {
    const channel = {
      members: [
        '5d2966baefda5a73faa563cc',
        '5d2966cfefda5a73faa563cd',
        '5d296628efda5a73faa563cb',
      ],
      name: 'CoderHood',
      user: '5d296628efda5a73faa563cb',
    };

    const tempReq = mockRequest(channel);
    const tempRes = mockResponse();

    await createWorkspace(tempReq, tempRes, next);

    const testChannel = await workspaceModel.findOne({ name: 'CoderHood' });
    const { _id } = testChannel;
    const req = {
      body: {
        operation: 'delete',
        id: _id,
        memberId: '5d2966baefda5a73faa563cc',
      },
    };
    const res = mockResponse();

    await updateWorkspaceMembers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send.mock.calls[0][0]).toMatchObject({
      message: 'Member updated successfully',
    });
  });
});
