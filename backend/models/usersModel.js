const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true, // Remove all the white space in the beginning or end of the field
    maxLength: [
      40,
      "A user name must have less than or equal to 40 characters",
    ],
    minLength: [4, "A user name must have more than or equal to 8 characters"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: [true, "A user must have a unique email"],
    trim: true, // Remove all the white space in the beginning or end of the field
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    maxLength: [
      40,
      "A user password must have less than or equal to 40 characters",
    ],
    minLength: [
      8,
      "A user password must have more than or equal to 8 characters",
    ],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have a password cofirm"],
    maxLength: [
      40,
      "A user password confirm must have less than or equal to 40 characters",
    ],
    minLength: [
      8,
      "A user password confirm must have more than or equal to 8 characters",
    ],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password Confirm must be equal to your password",
    },
    select: false,
  },
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  isActive: {
    type: Boolean,
    default: 1,
    select: false,
  },
  companyName: {
    type: String,
    trim: true, // Remove all the white space in the beginning or end of the field
    maxLength: [
      40,
      "A user name must have less than or equal to 40 characters",
    ],
    minLength: [2, "A user name must have more than or equal to 2 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: 0,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; // subtract 1 second to be older than the date of giving the token
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (process.env.SEEDS != "YES")
    this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // We use passwordConfirm only to check that tge user didn't input different passwords then we don't need this
  next();
});

userSchema.pre(/^find/, async function (next) {
  // this poinst to current query
  this.find({ isActive: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (candidate, real) {
  return await bcrypt.compare(candidate, real);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt)
    return parseInt(this.passwordChangedAt.getTime() / 1000) > JWTTimestamp;
  return 0;
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes with millis
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
