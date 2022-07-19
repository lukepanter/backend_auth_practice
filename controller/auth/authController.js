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
    if (result.isError === true) {
      res.status(500).send(result.error.message);
    } else {
      res.status(200).send(result.result);
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
