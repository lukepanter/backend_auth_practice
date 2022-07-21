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

const login = async (body) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE username = '${body.username}';`
    );
    if (result.rows.length === 0) {
      return {
        isError: true,
        error: { message: "Invalid username or password" },
      };
    } else {
      return { isError: false, result: result.rows };
    }
  } catch (err) {
    console.log(err);
    return { isError: true, error: err };
  }
};

const storeToken = async (body) => {
  try {
    const result = await pool.query(
      `INSERT INTO access_tokens(user_id, access_token, isactive, expire_date)
        VALUES ('${body.id}', '${body.token}', 1, '${body.expire_date}');`
    );
    return { isError: false, result: result.rows };
  } catch (err) {
    console.log(err);
    return { isError: true, error: err };
  }
};

const logout = async (body) => {
  try {
    const result = await pool.query(
      `UPDATE access_tokens SET isactive = 0 WHERE user_id = ${body.id};`
    );
    return { isError: false, result: result.rows };
  } catch (err) {
    console.log(err);
    return { isError: true, error: err };
  }
};

module.exports = {
  register,
  login,
  storeToken,
  logout,
};
