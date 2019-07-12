export const PORT = process.env.PORT || 8000;

const localMongoUri = 'mongodb://kunal:kunalkunnu2409@ds351107.mlab.com:51107/slack-clone';

export const MONGO_CONNECTION_STRING = process.env.MONGO_URI || localMongoUri;
