const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      selected: false,
    },
    otp: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        "admin",
        "vendor",
        "farmer",
        "golden_member",
        "wholesaler",
        "agriculture",
        "logistics",
        "machinery",
        "seeds",
        "rawMaterial",
        "landBrokers",
        "transport",
        "flower",
        "account",
        "customer",
      ],
      default: "customer",
    },
    reqRole: {
      type: String,
      enum: [
        "admin",
        "vendor",
        "farmer",
        "golden_member",
        "wholesaler",
        "flower",
        "agriculture",
        "logistics",
        "customer",
      ],
      default: "customer",
    },
    subRole: {
      type: String,
      enum: [
        "machinery",
        "seeds",
        "rawMaterial",
        "landBrokers",
        "transport",
        "account", 
        "customer",
        "flower"
      ],
      default: "customer",
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    dob: {
      type: Date,
    },

    profilePicture: String,
    paymentInfo: {
      paymentMethods: [String],
    },
    following: [],
    followers: [],
    industries: [
      {
        name: {
          type: String,
        },
        details: [
          {
            type: String,
            value: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
