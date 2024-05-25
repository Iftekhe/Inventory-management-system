const Location = require("../models/location.model");
const User = require("../models/user.model");

//branch location controller


exports.branchLocation = async (req, res) => {
    try{
    // Extract user input from the request body
    
   const { name, address, contactInfo } = req.body;
   console.log("3");

    const newBranch = new Location({
        name,
      address,
      contactInfo 
      // Add other user properties here
    });
    console.log("5");
    // Save the new user to the database
    await newBranch.save();
    console.log("6");
    
    res.status(201).json({ message: 'location successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error location ' });
  }
};




// 

exports.getUserWithLocation = async (req, res) => {
  const userId = req.params.userId; // Assuming the user ID is retrieved from the request URL

  try {
    const user = await User.findById(userId)
      .populate('branchId'); // Populate the 'branchId' field with data from the 'Location' collection

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user); // Send the user object with populated location details
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};