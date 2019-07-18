import callApi from '../../libs/axios';

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
  const result = await callApi('post', '/message/all', {
    channel: channelID
  });
  if (result.data) {
    const { data } = result.data.data;
    return data;
  }
  return [];
};

const fetchMembersData = async (members) => {
  const result = await callApi('post', '/user', { members });
  console.log(result);
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

export {
  updateMessageHeight,
  prettifyMessage,
  loadChannelMessagesIntoStore,
  fetchMembersData
};
