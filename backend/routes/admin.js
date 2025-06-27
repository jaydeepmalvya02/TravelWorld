import express from "express";
import { getAllTours, loginAdmin } from "../Controllers/adminConroller.js";

const adminRouter=express.Router()
adminRouter.post('/login',loginAdmin)
adminRouter.get('/all-tours',getAllTours)

export default adminRouter