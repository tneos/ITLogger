const mongoose = require("mongoose");

const LogsSchema = mongoose.Schema({
  id: String,
  message: {
    type: String,
    required: [true, "A new log should contain a message"],
  },
  attention: Boolean,
  tech: {
    type: String,
    required: [true, "A new log should contain technician's name"],
  },
  date: Date,
});

module.exports = mongoose.model("Logs", LogsSchema);
