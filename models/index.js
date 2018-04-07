const config = require("config");
const mongoose = require("mongoose");

const Race = require("./race");

const { host, port, name } = config.get("mongo");

mongoose
  .connect(`mongodb://${host}:${port}/${name}`)
  .catch(err => console.log(err));
mongoose.Promise = Promise;

module.exports = {
  Race
};
