const authModel = require("../model/auth/authModel");
const jwt = require("jwt-simple");
const moment = require("moment");

const isLogin = async (req, res, next) => {
  const exceptionPath = ["/", "/auth/login", "/auth/register"];
  if (exceptionPath.includes(req.path)) {
    next();
  } else {
    let result = await authModel.isLogin(
      req.headers.authorization,
      moment().format("YYYY-MM-DD")
    );
    if (
      result.result.length !== 0 &&
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
  }
};

module.exports = {
  isLogin,
};
