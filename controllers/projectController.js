const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Project = require("./../models/projectsModel");

exports.getAllProjects = catchAsync(async (req, res) => {
  let query = Project.find();
  if (req.query.name)
    query = query.find({
      name: { $regex: "^" + req.query.name, $options: "i" },
    });
  const projects = await query;
  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    results: projects.length,
    data: {
      projects,
    },
  });
});
exports.createProject = catchAsync(async (req, res) => {
  const newProject = await Project.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      project: newProject,
    },
  });
});
exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new AppError("Project not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});
