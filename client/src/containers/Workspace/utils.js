import callApi from '../../libs/axios';
import { methods, modules, endpoints } from '../../constants/constants';

function updateMessageHeight() {
  try {
    const containerHeight = document.querySelector(
      '#root > .section > .container'
    ).clientHeight;
    const viewPortHeight = window.innerHeight;
    const headerHeight = document.querySelector('.thread-body > .level')
      .clientHeight;
    const viewPortDiff = containerHeight - viewPortHeight - headerHeight;
    const height = viewPortDiff - headerHeight;
    document.getElementById('messages').style.maxHeight = height + 'px';
  } catch (error) {
    console.log('error in height calculations');
  }
}

const prettifyMessage = (messageObj) => {
  const { _id, fromUser, updated_At, message } = messageObj;
  const prettyMessage = {
    messageId: _id,
    username: fromUser,
    timeSince: updated_At || Date.now(),
    message
  };
  return prettyMessage;
};

const fetchChannelMessages = async (channelID) => {
  const { message } = modules;
  const { getAll } = endpoints;
  const result = await callApi('post', `/${message}/${getAll}`, {
    channel: channelID
  });
  if (result.data) {
    const { data } = result.data.data;
    return data;
  }
  return [];
};

const fetchMembersData = async (members) => {
  const { user } = modules;
  const { getSelected } = endpoints;
  const { post } = methods;
  const result = await callApi(post, `/${user}/${getSelected}`, { members });
  if (result.data) {
    const { data } = result.data.data;
    return data;
  }
  return [];
};

const fetchConversation = async (participantOne, participantTwo, workspaceId) => {
  const { message } = modules;
  const { getConversation } = endpoints;
  const result = await callApi('post', `/${message}/${getConversation}`, {
    userA: participantOne,
    userB: participantTwo,
    workspace: workspaceId,
  });
  if (result.data) {
    const { data } = result.data.data;
    return data;
  }
  return [];
};

const loadChannelMessagesIntoStore = async (channelId, setStoreFunc) => {
  const channelMessages = await fetchChannelMessages(channelId);
  setStoreFunc((store) => ({
    ...store,
    [channelId]: {
      isUser: false,
      unread: false,
      messages: [...channelMessages]
    }
  }));
};

const loadUserMessagesIntoStore = async (
  workspaceId,
  channelId,
  currentUser,
  otherUser,
  setStoreFunc
) => {
  const conversation = await fetchConversation(currentUser, otherUser, workspaceId);
  console.log(setStoreFunc);
  setStoreFunc((store) => ({
    ...store,
    [channelId]: {
      isUser: true,
      unread: false,
      messages: [...conversation]
    }
  }));
};

export {
  updateMessageHeight,
  prettifyMessage,
  loadChannelMessagesIntoStore,
  fetchMembersData,
  loadUserMessagesIntoStore
};
