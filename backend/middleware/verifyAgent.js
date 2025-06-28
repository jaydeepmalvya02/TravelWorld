import jwt from "jsonwebtoken";

const authAgent = async (req, res, next) => {
  try {
    const dtoken =
      req.headers["dtoken"] ||
      req.headers["dToken"] ||
      req.headers["authorization"];

    if (!dtoken) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET_KEY);
    // console.log(token_decode.user._id);
    if (!req.body) {
      req.body = {};
    }
    console.log(token_decode);
    

    req.body.agentId = token_decode.id;
    console.log(req.body.agentId);
    

    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
export default authAgent;
