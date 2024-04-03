const mongoose = require("mongoose");
const validator = require("validator");
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    user_id: {
      type: String,
      require: true,
    }, 
    created_by: {
      type: String,
      require: true,
    },
    last_msg_date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("contact", contactSchema);
