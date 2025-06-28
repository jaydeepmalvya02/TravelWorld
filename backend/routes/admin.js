import express from "express";
import { deleteAgent, getAllAgents, getAllTours, loginAdmin } from "../Controllers/adminConroller.js";
import authAdmin from '../middleware/verifyAdmin.js'

const adminRouter=express.Router()
adminRouter.post('/login',loginAdmin)
adminRouter.get('/all-tours',getAllTours)
adminRouter.get('/all-agents',authAdmin,getAllAgents)
adminRouter.delete('/delete-agent/:id',authAdmin,deleteAgent)

export default adminRouter