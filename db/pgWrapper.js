const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "oauth",
  password: "password",
  port: 5432,
});

client.on("connect", () => {
  console.log("connected to the database");
});

client.on("end", () => {
  console.log("disconnected from the database");
});

module.exports = client;
