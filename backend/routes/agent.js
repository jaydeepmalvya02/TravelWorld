import express from "express";
import { loginAgent } from "../Controllers/agentController.js";

const agentRouter = express.Router();
agentRouter.post("/login", loginAgent);

export default agentRouter;
