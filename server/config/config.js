require("dotenv").config();
const config = {
  development: {
    username: "root",
    password: "password",
    database: "uoftgroupchats",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "password",
    database: "uoftgroupchats",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "torontobluechats",
    password: process.env.MYSQL_PASSWORD,
    database: "uoftgroupchats",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

module.exports = config;
