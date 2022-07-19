const authModel = require("../../model/auth/authModel");

const login = async (req, res) => {
  try {
    console.log("hello");

    res.send("GET request to the homepage");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    let result = await authModel.register(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  register,
};
