const { sendWorkspaceInvite } =  require("./src/libs/emails/email");
const data = { 
  name: 'asdfad',
  email: 'tj2point0+test5@gmail.com',
  workspace: '5d29673defda5a73faa563d0',
  type: 'WorkspaceInvite',
  user: '5d2966baefda5a73faa563cc' 
};

sendWorkspaceInvite(data)
.then(console.log)
.catch(console.log);