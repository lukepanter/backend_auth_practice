const pool = require("../../db/pgWrapper");

const register = async (body) => {
  try {
    const result = await pool.query(
      `INSERT INTO users(username, user_password, first_name, last_name)
        VALUES ('${body.username}', '${body.user_password}', '${body.first_name}', '${body.last_name}')
        RETURNING *;`
    );
    return { isError: false, result: result.rows };
  } catch (err) {
    console.log(err);
    return { isError: true, error: err };
  }
};

module.exports = {
  register,
};
