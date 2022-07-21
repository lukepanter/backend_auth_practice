const authModel = require("../model/auth/authModel");
const jwt = require("jwt-simple");

const isLogin = (req, res, next) => {
  let result = authModel.isLogin(req.headers.authorization);
  if (
    result.length !== 0 &&
    req.headers.authorization !== undefined &&
    req.headers.authorization !== ""
  ) {
    let token = req.headers.authorization;
    let body = jwt.decode(token, "MY_SECRET_KEY");
    req.body.username = body.sub;
    next();
  } else {
    res.status(401).send("Please login");
  }
};

module.exports = {
  isLogin,
};
