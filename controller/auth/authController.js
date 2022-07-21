const authModel = require("../../model/auth/authModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    let result = await authModel.login(req.body);
    if (result.isError === true) {
      res.status(400).json({ errorMsg: result.error.message });
    } else if (
      bcrypt.compareSync(req.body.user_password, result.result[0].user_password)
    ) {
      res.status(200).json(result.result);
    } else {
      res.status(400).json({ errorMsg: "Invalid username or password" });
    }
  } catch (error) {
    console.log(error);
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
      res.status(200).json(result.result);
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

module.exports = {
  login,
  register,
};
