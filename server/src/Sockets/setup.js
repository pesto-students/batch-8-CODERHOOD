import { createWorkspaceNamespace, configureEventHandlersForWorkspace } from './socket';
import { workspaceModel } from '../Model';

const populateWorkspaceAsNamespacesInIO = async () => {
  const workspaceIds = await workspaceModel.find({}).select('_id');
  workspaceIds.forEach(({ _id }) => {
    const nsps = createWorkspaceNamespace(_id);
    configureEventHandlersForWorkspace(nsps);
  });
};

export default populateWorkspaceAsNamespacesInIO;
