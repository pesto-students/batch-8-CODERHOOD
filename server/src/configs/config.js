export const PORT = process.env.PORT || 8000;

const localMongoUri = 'mongodb://127.0.0.1:27017/slack-clone';

export const MONGO_CONNECTION_STRING = process.env.MONGO_URI || localMongoUri;
