import client from 'socket.io-client';
import {
  io,
  server,
  socketPath,
  db,
} from '../index';
import {
  createWorkspaceNamespace,
  configureEventHandlersForWorkspace,
} from '../Sockets/socket';

import {
  messageEvent,
  connectionConfirmationEvent,
} from '../Sockets/events';

// TODO: change test workspace names?
let socket;
let httpServer;
let httpServerAddr;
let ioServer;

beforeAll((done) => {
  httpServer = server;
  httpServerAddr = httpServer.address();
  ioServer = io;
  done();
});

afterAll((done) => {
  // Clear namespaces
  const namespaces = Object.keys(ioServer.nsps);
  // eslint-disable-next-line no-restricted-syntax
  for (const namespace of namespaces) {
    delete ioServer.nsps[namespace];
  }
  ioServer.close();
  httpServer.close();
  db.close();
  done();
});

describe('basic socket.io communication testing', () => {
  beforeEach((done) => {
    socket = client(`http://127.0.0.1:${httpServerAddr.port}`, {
      path: socketPath,
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      done();
    });
  });

  afterEach((done) => {
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  test('should communicate', (done) => {
    ioServer.emit('echo', 'Hello World');
    socket.once('echo', (message) => {
      expect(message).toBe('Hello World');
      done();
    });
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined();
    });
  });
});


describe('testing socket functions from "./Sockets/socket.js"', () => {
  const namespace = 'pesto';
  let workspace;

  beforeAll((done) => {
    workspace = createWorkspaceNamespace(namespace);
    configureEventHandlersForWorkspace(workspace);

    socket = client(`http://127.0.0.1:${httpServerAddr.port}/${namespace}`, {
      path: socketPath,
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      done();
    });
  });

  afterAll((done) => {
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  test('should connect to a namespace', (done) => {
    workspace.emit(connectionConfirmationEvent, 'connected!');
    socket.once(connectionConfirmationEvent, (message) => {
      expect(message).toBe('connected!');
      done();
    });
    workspace.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined();
    });
  });
});


describe('testing messaging between two sockets in a namespace', () => {
  const namespace1 = 'pesto';
  const namespace2 = 'btc';
  let workspace1;
  let workspace2;
  let socket1A;
  let socket1B;
  let socket2;

  beforeAll((done) => {
    workspace1 = createWorkspaceNamespace(namespace1);
    configureEventHandlersForWorkspace(workspace1);

    workspace2 = createWorkspaceNamespace(namespace2);
    configureEventHandlersForWorkspace(workspace2);

    function connectorHelper(nsps) {
      const soc = client(
        `http://127.0.0.1:${httpServerAddr.port}/${nsps}`,
        {
          path: socketPath,
          'reconnection delay': 0,
          'reopen delay': 0,
          'force new connection': true,
          transports: ['websocket'],
        },
      );
      soc.on('connect', () => {
        done();
      });

      return soc;
    }

    // connected to namespace1
    socket1A = connectorHelper(namespace1);
    socket1B = connectorHelper(namespace1);

    // connected to namespace2
    socket2 = connectorHelper(namespace2);
  });

  afterAll((done) => {
    if (socket1A.connected) {
      socket1A.disconnect();
    }
    if (socket1B.connected) {
      socket1B.disconnect();
    }
    if (socket2.connected) {
      socket2.disconnect();
    }
    done();
  });

  test('should exchange message between two sockets in a namespace', (done) => {
    socket1A.emit(messageEvent, { msg: 'Hey there!' });
    socket1B.once(messageEvent, ({ msg }) => {
      expect(msg).toBe('Hey there!');
      done();
    });
  });

  test('message should not got to sockets in different namespaces', (done) => {
    socket2.emit(messageEvent, { msg: 'Hey from another world!' });
    socket1A.emit(messageEvent, { msg: 'Hey there!' });
    socket1B.once(messageEvent, ({ msg }) => {
      expect(msg).toBe('Hey there!');
      expect(msg).not.toBe('Hey from another world!');
      done();
    });
  });
});
