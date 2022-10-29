const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'unknown'], default: 'unkown' },
    role: { type: String, enum: ['light', 'darkness', 'undefined'], default: 'undefined' },
    weapons: { type: String },
    img: { type: String, required: true, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Kingdom_Hearts_logo.svg/1200px-Kingdom_Hearts_logo.svg.png' }
  },
  {
    timestamps: true,
  }
)

const Character = mongoose.model('characters', characterSchema);

module.exports = Character;
