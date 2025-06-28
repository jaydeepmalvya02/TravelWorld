import express from "express";
import { agentRegistration, allBookings, createPackage, getPackages, getProfile, loginAgent } from "../Controllers/agentController.js";
import authAgent from "../middleware/verifyAgent.js";

const agentRouter = express.Router();
agentRouter.post("/login", loginAgent);
agentRouter.post("/register",agentRegistration);
agentRouter.get("/profile",authAgent,getProfile);
agentRouter.post("/package",authAgent,createPackage)
agentRouter.get("/package",authAgent,getPackages)
agentRouter.get("/bookings",authAgent,allBookings)
export default agentRouter;
