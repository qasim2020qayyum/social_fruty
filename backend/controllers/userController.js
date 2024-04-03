const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { default: mongoose } = require("mongoose");
const { generateOTP, sendMail } = require("../helper/mailHelper");

// Signup controller
const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      gender,
      dob,
      verified,
      address,
      vendorInfo,
      profilePicture,
      paymentInfo,
      additionalContacts,
    } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address", email });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists", email });
    }
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      return res.status(400).json({
        error:
          "Password should be at least 8 characters long and contain at least one uppercase letter",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let additionalContactsArray = [];
    let additionalContact = "";
    if (additionalContacts) {
      additionalContactsArray = additionalContacts.map((contact) => {
        const [type, value] = contact.split(":");
        return { type, value };
      });
      additionalContact = additionalContactsArray.map(
        (contact) => `${contact.type}:${contact.value}`
      );
    }

    const myOTP = generateOTP(6);
    const newUser = new User({
      name,
      email,
      phone,
      otp: myOTP,
      password: hashedPassword,
      role,
      verified,
      address,
      gender,
      dob,
      vendorInfo,
      profilePicture,
      paymentInfo,
      additionalContacts: additionalContact || [],
    });
    const user = await newUser.save();
    if (user) {
      await sendMail(user.email, user.otp);
      res.status(201).json({ message: "Otp Send to your Provided Email" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    if (user.isBlocked) {
      return res.status(403).json({
        error: "You are blocked. Contact the administrator for assistance.",
      });
    }
    if (!user.verified) {
      return res.status(422).json({ error: "Your Account is not Verified" });
    }
    const token = jwt.sign(
      { userId: user._id, userRole: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const otpCheck = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    if (otp !== user.otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }
    user.verified = true;
    const myOTP = generateOTP(15);
    user.otp = myOTP;
    await user.save();
    const token = jwt.sign(
      { userId: user._id, userRole: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "Welcome To Fruit Auction", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    const myOTP = generateOTP(6);
    user.otp = myOTP;
    await user.save();
    await sendMail(user.email, user.otp);
    res.status(201).json({ message: "Otp Send to your Provided Email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    const newPassword = "Agro1234"; // Set the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    await sendMail(user.email, newPassword); // Assuming sendMail sends OTP to the user's email
    res
      .status(201)
      .json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get user controller  --Admin
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameters, default to 1
    const usersPerPage = 10; // Number of users per page
    const totalUsers = await User.countDocuments(); // Get the total number of users

    const from = (page - 1) * usersPerPage + 1; // Calculate 'from' value
    const to = Math.min(from + usersPerPage - 1, totalUsers); // Calculate 'to' value

    const users = await User.find({}, "-password")
      .sort({ updatedAt: -1 }) // Sort by the updatedAt field in descending order (recently updated first)
      .skip(usersPerPage * (page - 1)) // Skip users based on the current page
      .limit(usersPerPage); // Limit the number of users per page

    const totalPages = Math.ceil(totalUsers / usersPerPage); // Calculate total pages

    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      users,
      meta: {
        currentPage: page,
        totalPages,
        totalUsers,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(userId, { password: 0 }); // Exclude password fields

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get single user controller by token
const getSingleUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// edit user role  --Admin
const editUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.role = role;
    const updatedRole = await user.save();
    res
      .status(200)
      .json({ message: "User role updated successfully", updatedRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// edit Own User Data
const editOwnUserData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const newData = req.body;
    const user = await User.findById(userId);
    const userSchema = User.schema;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { email, role, password, ...otherData } = newData;
    if (email || role) {
      return res.status(403).json({
        error: "You are not authorized to change email or role",
      });
    }
    Object.keys(otherData).forEach((key) => {
      if (userSchema.obj.hasOwnProperty(key)) {
        user[key] = otherData[key];
      }
    });
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      message: "User data updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Block User --Admin
const blockUser = async (req, res) => {
  try {
    const { userId, isBlocked } = req.body;
    const userToBlock = await User.findById(userId);
    if (!userToBlock) {
      return res.status(404).json({ error: "User not found" });
    }
    userToBlock.isBlocked = isBlocked;
    const user = await userToBlock.save();
    if (isBlocked) {
      return res
        .status(200)
        .json({ message: "User blocked successfully", user });
    }
    res.status(200).json({ message: "User Un-blocked successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// logout
const logout = (req, res) => {
  res.setHeader("Authorization", "");
  res.status(200).json({ message: "Logout successful" });
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete profile picture from Cloudinary if it exists
    if (userToDelete.profilePicture) {
      const publicId = extractPublicId(userToDelete.profilePicture);
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    }

    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePictureFromCloud = async (req, res) => {
  try {
    const { userId } = req.params;
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }
    // Delete profile picture from Cloudinary if it exists
    if (userToDelete.profilePicture) {
      const publicId = extractPublicId(userToDelete.profilePicture);
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    }

    res.status(200).json({
      message: "User image delete successfully from cloud",
      userToDelete,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to extract publicId from Cloudinary URL
const extractPublicId = (cloudinaryUrl) => {
  const publicIdRegex = /\/upload\/v\d+\/([^\/]+)\/([^\/.]+)\.\w+$/;
  const match = cloudinaryUrl.match(publicIdRegex);

  if (match && match[1] && match[2]) {
    return `${match[1]}/${match[2]}`;
  }

  throw new Error("Failed to extract publicId from Cloudinary URL");
};

// edit user data
const editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newData = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming you want to restrict certain fields from being updated
    const { password, ...otherData } = newData;

    const userSchema = User.schema;

    // Update user fields based on the provided data
    Object.keys(otherData).forEach((key) => {
      if (userSchema.obj.hasOwnProperty(key)) {
        user[key] = otherData[key];
      }
    });

    // If a new password is provided, hash and update it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user data
    const updatedUser = await user.save();
    res.status(200).json({
      message: "User data updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    if (!role) {
      return res.status(400).json({ error: "Role parameter is missing" });
    }

    const page = parseInt(req.query.page) || 1;
    const usersPerPage = 10;

    const totalUsers = await User.countDocuments({ role });

    const from = (page - 1) * usersPerPage + 1;
    const to = Math.min(from + usersPerPage - 1, totalUsers);

    const users = await User.find({ role }, "-password")
      .sort({ updatedAt: -1 })
      .skip(usersPerPage * (page - 1))
      .limit(usersPerPage);

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      users,
      meta: {
        currentPage: page,
        totalPages,
        totalUsers,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersByRoleFrontEnd = async (req, res) => {
  try {
    const { role } = req.params;
    if (!role) {
      return res.status(400).json({ error: "Role parameter is missing" });
    }

    const page = parseInt(req.query.page) || 1;
    const usersPerPage = 10;

    const totalUsers = await User.countDocuments({ role });

    const from = (page - 1) * usersPerPage + 1;
    const to = Math.min(from + usersPerPage - 1, totalUsers);
    // const user = await User.findById(userId, { password: 0, }); // Exclude password fields
    const users = await User.find({ role }, "-password")
      .sort({ updatedAt: -1 })
      .skip(usersPerPage * (page - 1))
      .limit(usersPerPage);

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      users,
      meta: {
        currentPage: page,
        totalPages,
        totalUsers,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// social

const getUsersExceptFollowing = async (req, res) => {
  try {
    const userId = req.user.userId;
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const followingIds = currentUser.following.map((user) => user._id);

    const users = await User.aggregate([
      { $match: { _id: { $nin: followingIds } } },
      { $sample: { size: 100 } },
    ]);

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  signup,
  login,
  getAllUsers,
  getSingleUserProfile,
  editUserRole,
  editOwnUserData,
  blockUser,
  logout,
  deleteUser,
  deletePictureFromCloud,
  getUsersByRole,
  getUsersByRoleFrontEnd,
  getSingleUserById,
  editUser,
  otpCheck,
  resendOtp,
  forgetPassword,
  // social
  getUsersExceptFollowing,
};
