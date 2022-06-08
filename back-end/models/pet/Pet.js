const mongoose = require('../../db/connection');

const petSchema = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    color: { type: String, required: true },
    images: { type: Array, required: true },
    available: { type: Boolean },
    user: Object,
    adopter: Object
  },
  { timestamps: true }
);

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
