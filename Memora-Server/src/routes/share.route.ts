import { Router } from "express";
import { postShareLink, getShareLink } from "../controllers/share.controller.js";
const shareRouter = Router();

shareRouter.post('/share', postShareLink);
shareRouter.get('/:sharelink', getShareLink);

export default shareRouter;