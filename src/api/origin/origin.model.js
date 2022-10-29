const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const originSchema = new Schema(
  {
      name: {type: String, required: true},
      firstAppearance: {type: String}
  },
  {
    timestamps: true,
  }
);

const Origin = mongoose.model('origins', originSchema);

module.exports = Origin;