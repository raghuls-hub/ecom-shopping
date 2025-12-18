const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Products", schema);
