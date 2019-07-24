import * as express from "express";
import {
  createInvitation,
  getAllInvitations,
} from "./InvitationController";

const invitationRouter = express.Router();

invitationRouter.post("/all", getAllInvitations);
invitationRouter.post("/", createInvitation);

export default invitationRouter;
