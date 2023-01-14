const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A ticket must have a subject!"],
    trim: true, // Remove all the white space in the beginning or end of the field
    maxLength: [
      50,
      "A ticket subject must have less than or equal to 50 characters",
    ],
    minLength: [
      4,
      "A ticket subject must have more than or equal to 4 characters",
    ],
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
