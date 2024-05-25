const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "branch_admin", "employee"],
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false, // Newly registered users are not approved by default
  },
  department: {
    type: String,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/, // Email validation regex
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  address: {
    type: String, // Store image data as Base64 string
    required: true
    // type: {
    //   city: { type: String, trim: true },
    //   zipCode: { type: String, trim: true },
    // },
    // required: false, // Ensure address information is provided
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location", // Reference to Locations collection
    required: function () { return this.role !== "admin"; }, // Optional for admins
  },
  profileImage: {
    type: String, // Store image data as Base64 string
    required: true
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Exclude password from user object response
  delete user.tokens; // Exclude tokens for security reasons
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;