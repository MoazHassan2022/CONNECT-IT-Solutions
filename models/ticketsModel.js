const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  subject: {
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
  description: {
    type: String,
    required: [true, "A ticket must have a description!"],
    trim: true, // Remove all the white space in the beginning or end of the field
    maxLength: [
      2000,
      "A ticket description must have less than or equal to 2000 characters",
    ],
    minLength: [
      70,
      "A ticket description must have more than or equal to 70 characters",
    ],
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A ticket must belong to a client!"],
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
  },
  category: {
    type: String,
    enum: {
      values: ["Service", "System", "Network", "Telecommunications"],
      message:
        "Category is either Service, System, Network or Telecommunications!",
    },
  },
  attachments: [String], ///////////////// NEEDS WORK //////////////////
  answer: String,
  comments: [Object],
  status: {
    type: Number,
    enum: {
      values: [1, 2, 3],
      message: "Status is either 1, 2 or 3!.",
    },
    default: 1,
  },
  priority: {
    type: Number,
    enum: {
      values: [1, 2, 3],
      message: "Priority is either 1, 2 or 3! 3 is the heighst priority.",
    },
  },
  createdAt: String,
  answeredAt: String,
});
ticketSchema.pre(/^find/, function (next) {
  this.populate({
    path: "project",
    select: "name",
  })
    .populate({
      path: "client",
      select: "name photo",
    }) // populate makes the query that brings documents of users into guides field, so it will look like embedded users in it each time you query
    .populate({
      path: "admin",
      select: "name photo",
    });
  next();
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
