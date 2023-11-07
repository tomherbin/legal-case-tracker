const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["Open", "Closed", "In Progress"],
    default: "Open",
  },
  summary: String,
});

module.exports = mongoose.model("Case", caseSchema);
