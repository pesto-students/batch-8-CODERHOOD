const logo = {
    src: 'https://dummyimage.com/100x100/000/fff&text=CoderHood',
    alt: 'CoderHood Logo',
};

export const methods = {
    post: 'post',
    get: 'get',
    put: 'put',
    delete: 'delete',
};

export const modules = {
    workspace: 'workspace',
    user: 'user',
    channel: 'channel',
    message: 'message',
    invitation: 'invitation',
}

export const endpoints = {
    getAll: 'all',
    getSelected: 'selected',
    login: 'login',
    getConversation: 'conversation',
    member: 'member',
}

export const messageEvent = 'message';
export const connectedEvent = 'connected';
export const typingEvent = 'typing';
export const clearTypingEvent = 'clear typing';
export const userJoiningEvent = 'user joined';
export const userLeavingEvent = 'user left';

export default logo;
