const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
});

schema.plugin(uniqueValidator, {
  message: "Error, expected {PATH}/ {VALUE}/ {TYPE} to be unique.",
});

module.exports = mongoose.model("Author", schema);
