const mongoose = require("mongoose");

const TechsSchema = mongoose.Schema({
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
