// Schema Names
export const USER_SCHEMA = 'UserSchema';
export const CHANNEL_SCHEMA = 'ChannelSchema';
export const WORKSPACE_SCHEMA = 'WorkspaceSchema';
export const MESSAGE_SCHEMA = 'MessageSchema';

// Route Prefixes
export const USER_PREFIX = 'user';
export const CHANNEL_PREFIX = 'channel';
export const WORKSPACE_PREFIX = 'workspace';
export const MESSAGE_PREFIX = 'message';

// Endpoint response messages

// Channel
export const channelResponse = {
  channelFound: 'Channel is here',
  channelNotFound: 'Channel does not exists',
  foundAllChannels: 'Channels are here',
  channelCreated: 'Channel created successfully',
  channelUpdated: 'Channel updated successfully',
  channelDeleted: 'Channel deleted successfully',
};

// User
export const userResponse = {
  userFound: 'User is here',
  userNotFound: 'User does not exists',
  foundAllUsers: 'Users are here',
  userCreated: 'User created successfully',
  userUpdated: 'User updated successfully',
  userDeleted: 'User deleted successfully',
};

// Workspace
export const workspaceResponse = {
  workspaceFound: 'Workspace is here',
  workspaceNotFound: 'Workspace does not exists',
  foundAllWorkspaces: 'Workspaces are here',
  workspaceCreated: 'Workspace created successfully',
  workspaceUpdated: 'Workspace updated successfully',
  workspaceDeleted: 'Workspace deleted successfully',
};

// Message
export const messageResponse = {
  messageFound: 'Message is here',
  messageNotFound: 'Message does not exists',
  foundAllMessages: 'Messages are here',
  messageCreated: 'Message created successfully',
  messageUpdated: 'Message updated successfully',
  messageDeleted: 'Message deleted successfully',
};

// OTHER
export const SALT_WORK_FACTOR = 10;
