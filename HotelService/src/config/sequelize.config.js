require("ts-node/register"); // enables TS support
const config = require("./db.config.js");
console.log(config);
module.exports = config;
