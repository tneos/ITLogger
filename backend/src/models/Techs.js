const mongoose = require("mongoose");

const TechsSchema = mongoose.Schema({
  id: {
    type: Number,
    required: [true, "A new log should contain an id"],
  },
  firstName: {
    type: String,
    required: [true, "A new technician should contain first name"],
  },
  lastName: {
    type: String,
    required: [true, "A new technician should contain last name"],
  },
});

module.exports = mongoose.model("Techs", TechsSchema);
