const mongoose = require("mongoose");

const RaceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  faction: {
    type: String,
    required: true
  },
  capital: {
    type: String,
    required: true
  },
  leaders: {
    type: [String],
    required: true
  },
  mount: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("races", RaceSchema);
