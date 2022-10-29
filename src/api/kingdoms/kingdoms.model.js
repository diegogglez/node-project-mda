const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const kingdomSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Kingdom_Hearts_logo.svg/1200px-Kingdom_Hearts_logo.svg.png%22%7D"},
  },
  {
    timestamps: true,
  }
);

const Kingdom = mongoose.model("kingdom", kingdomSchema);

module.exports = Kingdom;