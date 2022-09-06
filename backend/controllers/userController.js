const fs = require('fs');
const express = require('express');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/usersModel');
const Ticket = require('./../models/ticketsModel');

const filterObj = (obj, ...allowed) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowed.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for updating the password, Please use this route /updateMyPassword',
        400
      )
    );
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'photo',
    'companyName'
  );
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true, // return the updated user
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    results: 1,
    requiredAt: req.requestTime,
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    requiredAt: req.requestTime,
    requestAt: req.requestTime,
    data: {
      users,
    },
  });
});
exports.getMyTickets = catchAsync(async (req, res) => {
  const tickets = await Ticket.find({
    $or: [{ admin: req.user.id }, { client: req.user.id }],
  });
  res.status(200).json({
    status: 'success',
    results: tickets.length,
    requiredAt: req.requestTime,
    data: {
      tickets,
    },
  });
});
