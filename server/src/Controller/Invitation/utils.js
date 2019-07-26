/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import { findMany, findOne, updateArrayField } from '../../Repositories/genericRepository';
import { invitationModel, workspaceModel, channelModel } from '../../Model';

async function acceptWorkspaceInvite(wsModel, workspaceId, memberId) {
  try {
    const workspace = await findOne(wsModel, { _id: workspaceId });
    if (!workspace) {
      return;
    }
    const member = await findOne(wsModel, {
      _id: workspaceId,
      members: memberId,
    });
    if (member) {
      return;
    }

    await updateArrayField(wsModel, 'add', { _id: workspaceId }, memberId);
  } catch (error) {
    // proceed silently
  }
}

async function acceptAllWorkspaceInvites(userId, userEmail, skipInviteChecks = false) {
  if (skipInviteChecks) {
    return;
  }
  const userInvitations = await findMany(invitationModel, { email: userEmail });
  const { data } = userInvitations;
  // eslint-disable-next-line no-restricted-syntax
  for (const invite of data) {
    await acceptWorkspaceInvite(workspaceModel, invite.workspace, userId);
    const workspaceId = invite.workspace;
    if (workspaceId) {
      const channel = await findOne(channelModel, { workspace: workspaceId, name: 'General' });
      if (channel) {
        await updateArrayField(channelModel, 'add', { _id: channel._id }, userId);
      }
    }
  }

  // data.forEach(async (invite) => {
  //   await acceptWorkspaceInvite(workspaceModel, invite.workspace, userId);
  // });
}

export { acceptAllWorkspaceInvites, acceptWorkspaceInvite };
