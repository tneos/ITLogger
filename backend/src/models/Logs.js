const mongoose = require("mongoose");

const LogsSchema = mongoose.Schema({
  message: {
    type: String,
    required: [true, "A new log should contain a message"],
  },
  attention: Boolean,
  tech: {
    type: String,
    required: [true, "A new log should contain technician's name"],
  },
  date: {
    type: String,
    required: [true, "A new log should contain the date"],
  },
});

module.exports = mongoose.model("Logs", LogsSchema);
