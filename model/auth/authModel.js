const client = require("../../db/pgWrapper");

const register = async (body) => {
  await client.connect();
  const result = await client.query(`select * from users`);
  console.log(result.rows);
  client.end();
  return result.rows;
};

module.exports = {
  register,
};
