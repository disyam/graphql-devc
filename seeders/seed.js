const config = require("config");
const mongoose = require("mongoose");

const { host, port, name } = config.get("mongo");

const { Race } = require("../models");

const races = require("./race.json");

module.exports = async () => {
  try {
    await mongoose.connect(`mongodb://${host}:${port}/${name}`);
    await Race.remove({});
    await Race.insertMany(races);
  } catch (error) {
    throw error;
  }
};
