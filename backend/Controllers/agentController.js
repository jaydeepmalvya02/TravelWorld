import Agent from "../models/AgentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";
const loginAgent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (isMatch) {
      const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET_KEY);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error.message);

    res.json({ success: false, message: error.message });
  }
};
// Register Agent

const agentRegistration = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      companyName,
      companyAddress,
      region,
      languages,
      servicesOffered,
      commissionRate,
    } = req.body;
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Enter All details for register!",
      });
    }
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.json({
        success: false,
        message: "Agent with this email already exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({
      name,
      email,
      password: hashedPassword,
      phone,
      companyName,
      companyAddress: companyAddress || "",
      region: region || "",
      languages: languages || [],
      servicesOffered: servicesOffered || [],
      commissionRate: commissionRate || 0,
      // status, verified, rating have defaults so no need to set
    });
    const savedAgent = await newAgent.save();
    res.json({ success: true, message: "Agent Registered", savedAgent });
  } catch (error) {
    console.error(error.message);

    res.json({ success: false, message: error.message });
  }
};

// GET agent Profile by id
const getProfile = async (req, res) => {
  try {
    const { agentId } = req.body;
    const agentData = await Agent.findById(agentId);
    res.json({ success: true, agentData });
  } catch (error) {
    console.error(error.message);

    res.json({ success: false, message: error.message });
  }
};
//  Add Packages from agent panal
const createPackage = async (req, res) => {
  try {
    const {
      agentId,
      city,
      address,
      distance,
      photo,
      desc,
      price,
      maxGroupSize,
    } = req.body;
    const newPackage = new Tour(req.body);
    const savedPackage = await newPackage.save();
    res.json({ success: true, savedPackage });
  } catch (error) {
    console.error(error.message);

    res.json({ success: false, message: error.message });
  }
};
// GET tours for agent
const getPackages = async (req, res) => {
  try {
    const { agentId } = req.body;
    const packageData = await Tour.find({ agentId });
    res.json({ success: true, packageData });
  } catch (error) {
    console.error(error.message);

    res.json({ success: false, message: error.message });
  }
};
const getDashboardData = async (req, res) => {
  try {
    const { agentId } = re.body;
    const toursData = await Tour.find({ agentId });
    const bookings=await Booking.find({agentId})
    let earnings=0

   
    const dashData={

    }

  } catch (error) {
    console.error(error.message);

    res.json({ success: false, message: error.message });
  }
};
// Get All booking details associate with agent
const allBookings=async(req,res)=>{
  try {
    console.error(error.message);

    res.json({ success: false, message: error.message });
  } catch (error) {
    const {agentId}=req.body
    const bookings=await Booking.find({agentId})
    res.json({success:true,bookings})
  }
}
export {
  loginAgent,
  agentRegistration,
  getProfile,
  createPackage,
  getPackages,
  allBookings
};
