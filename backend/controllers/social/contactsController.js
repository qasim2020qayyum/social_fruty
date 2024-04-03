const Contacts = require("../../models/social/contactsModel");
const User = require("../../models/userModel");

// Controller to add data to Farmer Industry
const addContacts = async (req, res) => {
  try {
    const { user_id, created_by } = req.params;
    const user = await User.findById(user_id);
    const createdBy = await User.findById(created_by);

    // Check if the user with the provided ID exists and has the role "farmer" or "admin"
    if (!user) {
      return res.status(403).json({ error: "User not found." });
    }
    if (!createdBy) {
      return res.status(403).json({ error: "Created User not found." });
    }
    // Create a new instance of the Farmer Industry model
    const newContact = new Contacts({
      name: user.name,
      profilePicture: user.profilePicture,
      email: user.email,
      user_id,
      created_by,
    });

    // Save the new Farmer Industry data
    const contact = await newContact.save();
    if (contact) {
      createdBy.following.push({
        _id: user._id,
      });
    }
    const updatedUser = await createdBy.save();
    // Respond with a success message
    res
      .status(201)
      .json({ message: "Contact added successfully", contact, updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getContacts = async (req, res) => {
//   try {
//     const { created_by } = req.params;

//     // Find the user by ID to get their following list
//     const currentUser = await User.findById(created_by);
//     if (!currentUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     // Find all contacts for the specified created_by except those in the following list
//     const contacts = await Contacts.aggregate([
//       { $match: { created_by } },
//       { $sample: { size: 15 } },
//     ]);

//     res.status(200).json({ contacts });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const getContacts = async (io, created_by) => { 
  try {
      const currentUser = await User.findById(created_by);
      if (!currentUser) {
          io.emit('contactList-altbar', { success: false, message: 'User not found' });
          return;
      }
      const contacts = await Contacts.aggregate([
          { $match: { created_by } },
          { $sample: { size: 15 } },
      ]);
      io.emit('contactList-altbar', { success: true, contacts }); 
  } catch (error) {
      io.emit('contactList-altbar', { success: false, error: error.message });
  }
};

const getSingleContact = async (req, res) => {
    try {
        const { user_id } = req.params; 
      const user = await Contacts.find({user_id});
      if (!user) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  const deleteContact = async (req, res) => {
    try {
      const { user_id, created_by } = req.params;
  
      // Find the contact to delete
      const contact = await Contacts.findOneAndDelete({ user_id });
  
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
  
      // Remove the user_id from the following list of the created_by user
      const createdByUser = await User.findById(created_by);
      if (!createdByUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const index = createdByUser.following.findIndex((item) =>
        item._id.equals(user_id)
      );
      if (index !== -1) {
        createdByUser.following.splice(index, 1);
      }
  
      await createdByUser.save();
  
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {
  addContacts,
  getContacts,
  getSingleContact,
  deleteContact
};
