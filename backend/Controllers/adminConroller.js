import jwt from "jsonwebtoken";
import Tour from "../models/Tour.js";
import Agent from "../models/AgentModel.js"
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// GET all Tours for admin
const getAllTours=async(req,res)=>{
  try {
    const tours=await Tour.find({})
    res.json({success:true,data:tours})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Get all Agents in admin panal
const getAllAgents=async(req,res)=>{
  try {
    
    const agents=await Agent.find({})
    res.json({success:true,agents})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
const deleteAgent=async(req,res)=>{
  try {
    const agentId=req.params.id
    await Agent.findByIdAndDelete(agentId)
    res.json({success:true,message:"Successfuly Deleted!"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
export {loginAdmin,getAllTours,getAllAgents,deleteAgent}