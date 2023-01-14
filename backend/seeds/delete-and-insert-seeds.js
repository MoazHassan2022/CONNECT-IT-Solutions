const fs = require("fs");
const Ticket = require("../models/ticketsModel");
const Project = require("./../models/projectsModel");
const User = require("./../models/usersModel");
const dbConnect = require("./../db-connection/connection");

dbConnect();

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/projects.json`, "utf-8")
);
const tickets = JSON.parse(
  fs.readFileSync(`${__dirname}/tickets.json`, "utf-8")
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

/**
 * Inserts all seeds in the collections
 */
const importData = async () => {
  try {
    await Project.create(projects, { validateBeforeSave: false });
    await Ticket.create(tickets, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

/**
 * Deletes all collections' documents
 */
const deleteData = async () => {
  try {
    await Project.deleteMany();
    await Ticket.deleteMany();
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
