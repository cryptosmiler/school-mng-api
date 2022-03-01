const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be Provided"],
    maxlength: 50,
  },
  admissionNum: {
    type: String,
    required: [true, "Addimission Number Must be Provided"],
    maxlength: 6,
    minlength: 6,
    unique: true,
  },
  dob: {
    type: String,
    required: [true, "Date Of Birth must be Provided"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Form Teacher Id must be Provided"],
  },
});

module.exports = mongoose.model("students", StudentsSchema);
