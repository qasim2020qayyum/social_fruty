const multer = require("multer");
const path = require("path");
// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join(__dirname, "uploads/")); // Define the destination folder for uploaded files
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix); // Define filename as fieldname + unique suffix
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]; // Define allowed file types

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only images (jpeg, jpg, png) are allowed!"),
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload.single("profilePicture");

// const bcrypt = require("bcrypt");
// const User = require("../models/userModel");
// const upload = require("../middlewares/fileUploadMiddleware");
// const multer = require("multer");
// const signup = async (req, res) => {
//   try {
//     upload(req, res, async (err) => {
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({ error: err.message });
//       } else if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       const {
//         name,
//         email,
//         phone,
//         password,
//         role,
//         address,
//         vendorInfo,
//         paymentInfo,
//         additionalContacts,
//       } = req.body;
//       const { path: profilePicture } = req.file || {}; // Get the path of the uploaded file
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) {
//         return res.status(400).json({ error: "Invalid email address", email });
//       }
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: "Email already exists", email });
//       }
//       if (password.length < 8 || !/[A-Z]/.test(password)) {
//         return res.status(400).json({
//           error:
//             "Password should be at least 8 characters long and contain at least one uppercase letter",
//         });
//       }
//       const hashedPassword = await bcrypt.hash(password, 10);
//       let additionalContactsArray = [];
//       let additionalContact = "";

//       if (additionalContacts) {
//         additionalContactsArray = additionalContacts.map((contact) => {
//           const [type, value] = contact.split(":");
//           return { type, value };
//         });

//         additionalContact = additionalContactsArray.map(
//           (contact) => `${contact.type}:${contact.value}`
//         );
//       }
//       const newUser = new User({
//         name,
//         email,
//         phone,
//         password: hashedPassword,
//         role,
//         address,
//         vendorInfo,
//         profilePicture,
//         paymentInfo,
//         additionalContacts: additionalContact || [],
//       });

//       const user = await newUser.save();
//       res
//         .status(201)
//         .json({ message: "Your Account created successfully", user });
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// module.exports = { signup };
