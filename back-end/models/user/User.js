const mongoose = require('../../db/connection');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 35 },
    image: { type: String },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
