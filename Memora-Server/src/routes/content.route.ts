import { Router } from "express";
import { postContent, getContent, deleteContent } from "../controllers/content.controller.js";

const contentRouter = Router();

contentRouter.post('/', postContent)
contentRouter.get('/', getContent);
contentRouter.delete('/', deleteContent);

export default contentRouter