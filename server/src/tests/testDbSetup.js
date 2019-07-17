import mongoose from 'mongoose';

const TEST_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/test-db';

(async function connectTestDb() {
  try {
    await mongoose.connect(TEST_CONNECTION_STRING, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  } catch (e) {
    console.error(e);
  }
}());

export default mongoose.connection;
