import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import socketIO from 'socket.io';
import cors from 'cors';

import router from './router';
import { errorHandler, notFoundRoutes } from './libs/routes';
import { PORT, MONGO_CONNECTION_STRING } from './configs/config';
import successHandler from './libs/routes/successHandler';
import populateWorkspaceAsNamespacesInIO from './Sockets/setup';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());

app.use('/api', router);
app.use(notFoundRoutes);
app.use(errorHandler);
app.use(successHandler);

export const server = app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Server started at port ${PORT}.`);
});

(async function startServer() {
  console.log('Starting server.');
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    populateWorkspaceAsNamespacesInIO();
  } catch (e) {
    console.error(e);
    server.close(() => console.log('Server stopped.'));
  }
}());

export const socketPath = '/sockets/';
export const io = socketIO(server, { path: socketPath });
export const db = mongoose.connection;
