const authModel = require("../../model/auth/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const moment = require("moment");

const login = async (req, res) => {
  try {
    switch (req.body.grant_type) {
      case "password":
        let result = await authModel.getOneUser(req.body);
        if (result.isError === true) {
          res.status(400).json({ errorMsg: result.error.message });
        } else if (
          bcrypt.compareSync(
            req.body.user_password,
            result.result[0].user_password
          )
        ) {
          const payload = {
            sub: req.body.username,
            iat: new Date().getTime(),
          };
          const SECRET = "MY_SECRET_KEY";
          const token = jwt.encode(payload, SECRET);

          let expire_date = moment().add(1, "days").format("YYYY-MM-DD");
          console.log(result);
          let createTokenBody = {
            id: result.result[0].id,
            token: token,
            expire_date: expire_date,
          };

          await authModel.storeToken(createTokenBody);

          let response = {
            access_token: token,
            token_type: "Bearer",
            expires_in: 86400,
          };
          res.status(200).json(response);
        } else {
          res.status(401).json({ errorMsg: "Invalid username or password" });
        }
        break;
      default:
        res.status(400).json({ errorMsg: "Invalid grant_type" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: "Login Failed", error: error });
  }
};

const register = async (req, res) => {
  try {
    const saltRounds = 10;
    req.body.user_password = bcrypt.hashSync(
      req.body.user_password,
      saltRounds
    );
    let result = await authModel.register(req.body);
    if (result.isError === true) {
      res.status(400).json({ errorMsg: result.error.message });
    } else {
      res.status(200).json("Register Success");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: "Register Failed", error: error });
  }
};

const logout = async (req, res) => {
  try {
    let result = await authModel.logout(req.body);
    if (result.isError === true) {
      res.status(400).json({ errorMsg: result.error.message });
    } else {
      res.status(200).json("Logout Success");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: "Log out Failed", error: error });
  }
};

const profile = async (req, res) => {
  try {
    let token = req.headers.authorization;
    let body = jwt.decode(token, "MY_SECRET_KEY");
    body.username = body.sub;
    let result = await authModel.profile(body);
    if (result.isError === true) {
      res.status(400).json({ errorMsg: result.error.message });
    } else {
      res.status(200).json(result.result);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: "Get profile Failed", error: error });
  }
};

module.exports = {
  login,
  register,
  logout,
  profile,
};
