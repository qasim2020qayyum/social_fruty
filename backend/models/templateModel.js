const mongoose = require("mongoose");

const templateSchema  = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["OTP", "ForgetPassword", "RoleConfirmation", "Custom"],
        required: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("template", templateSchema);
