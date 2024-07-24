const { Token } = require('../models');
// ran into error at 13:26
const isAuth = async (req,res,next) => {
  const token = await Token.findOne({ where: {} });
  if(!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("token in middleware", token);
  req.token = token;
  next();
};

module.exports = isAuth;