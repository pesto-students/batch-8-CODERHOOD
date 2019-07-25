import { findMany, findOne, updateArrayField } from '../../Repositories/genericRepository';
import { invitationModel, workspaceModel } from '../../Model';

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

async function acceptAllWorkspaceInvites(userId, userEmail) {
  const userInvitations = await findMany(invitationModel, { email: userEmail });
  const { data } = userInvitations;
  // eslint-disable-next-line no-restricted-syntax
  for (const invite of data) {
    // eslint-disable-next-line no-await-in-loop
    await acceptWorkspaceInvite(workspaceModel, invite.workspace, userId);
  }

  // data.forEach(async (invite) => {
  //   await acceptWorkspaceInvite(workspaceModel, invite.workspace, userId);
  // });
}

export { acceptAllWorkspaceInvites, acceptWorkspaceInvite };
