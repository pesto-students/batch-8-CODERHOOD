import { channelModel } from '../Model';
import {
  createChannel,
  updateChannelMembers,
} from '../Controller/Channel/ChannelController';
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
  channelModel.deleteMany({}, (err) => {
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

describe('Test api/channel endpoints', () => {
  test('put(/member) - updateChannelMember should update the data of the given channel', async () => {
    const channel = {
      members: [
        '5d2966cfefda5a73faa563cd',
        '5d296628efda5a73faa563cf',
      ],
      name: 'Hackathon',
      workspace: '5d296724efda5a73faa563ce',
      user: '5d296628efda5a73faa563cb',
      isPrivate: false,
    };

    const tempReq = mockRequest(channel);
    const tempRes = mockResponse();

    await createChannel(tempReq, tempRes, next);

    const testChannel = await channelModel.findOne({ name: 'Hackathon' });
    const { _id } = testChannel;
    const req = {
      body: {
        operation: 'add',
        id: _id,
        memberId: '5d2966baefda5a73faa563cc',
      },
    };
    const res = mockResponse();

    await updateChannelMembers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send.mock.calls[0][0]).toMatchObject({
      message: 'Member updated successfully',
    });
  });
});
