import { createWorkspaceNamespace, configureEventHandlersForWorkspace } from './Sockets/socket';
import { workspaceModel } from './Model';

const populatesWorkspaceNamespacesInIo = async () => {
  const workspaceIds = await workspaceModel.find({}).select('_id');
  workspaceIds.forEach(({ id }) => {
    const nsps = createWorkspaceNamespace(id);
    configureEventHandlersForWorkspace(nsps);
  });
};

export default populatesWorkspaceNamespacesInIo;
