const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const passport = require('../config/passport');
const User = require("../models/user.model");
const fs = require('fs');
const path = require('path');


// const saltRounds = 10;

//home controller
exports.index = (req,res)=>{
        res.send("this is home");
}

//register controller -- POST
exports.registerUser = async (req, res) => {
    const uploadedFile = req.file;
    try{
    // Extract user input from the request body
    
   const { username, password, email, role, department, fullName, phoneNumber, address, branchId, profileImage } = req.body;
   console.log("3");
   if (!password) {
    if (uploadedFile) {
        fs.unlinkSync(path.join(__dirname, '../uploads/profileImage', uploadedFile.filename));
    }
    return res.status(400).json({ message: 'Password is required' });
}
    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        if (uploadedFile) {
            fs.unlinkSync(path.join(__dirname, '../uploads/profileImage', uploadedFile.filename));
        }
      return res.status(400).json({ message: 'Username or email is already taken' });
    }
    // if (!req.file) {
    //     return res.status(400).json({ message: 'profileImage is required' });
    // }

    if (!uploadedFile) {
        return res.status(400).json({ message: 'Profile image is required' });
      }
    console.log("33");
    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    console.log("4   "+address);
    // Create a new user based on the User schema
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
      department,
      fullName,
      phoneNumber,
      address,
      approved: false,
      branchId, 
      profileImage : uploadedFile.filename,
      // Add other user properties here
    });
    console.log("5");
    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log("6");
    
    // Omit the hashed password from the response for security
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
  } catch (error) {
    console.error(error);

    // Delete the uploaded file if there is an error during registration
    if (uploadedFile) {
        fs.unlinkSync(path.join(__dirname, '../uploads/profileImage', uploadedFile.filename));
    }
    res.status(500).json({ message: 'Error registering user' });
  }
};


//get user by id

exports.userById =  (req, res) => {
  try {
    const id = req.params.id
     User.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving');
  }
};

//All user 

exports.AllUser = async (req, res) => {
  try {
    const users = await User.find()
     res.json(users) 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving');
  }
};




//update register user controller -- put

exports.registerUpdateUser = async (req, res) => {
    const uploadedFile = req.file;
  
    try {
      const id = req.params.id;  // Get the user ID from the URL parameter
      const { username, password, role, isApproved, department, fullName, email, phoneNumber, address, branchId } = req.body;
  
      // Find the existing user
      const user = await User.findById(id);
      if (!user) {
        if (uploadedFile) {
          fs.unlinkSync(path.join(__dirname, '../uploads/profileImage', uploadedFile.filename));
        }
        return res.status(404).send({ success: false, msg: 'User not found' });
      }
  
      // Check for duplicate username
      if (username && username !== user.username) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          if (uploadedFile) {
            fs.unlinkSync(path.join(__dirname, '../uploads/profileImage', uploadedFile.filename));
          }
          return res.status(400).send({ success: false, msg: 'Username is already taken' });
        }
      }
  
      // Check for duplicate email
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          if (uploadedFile) {
            fs.unlinkSync(path.join(__dirname, '../uploads/profileImage', uploadedFile.filename));
          }
          return res.status(400).send({ success: false, msg: 'Email is already taken' });
        }
      }
  
      // Create an update object
      const updateData = {
        username,
        role,
        isApproved,
        department,
        fullName,
        email,
        phoneNumber,
        address,
        branchId
      };
  
      // Remove undefined fields from the update object
      Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
  
      // Check if a file is uploaded for profileImage
      if (uploadedFile) {
        // Delete the old image file if it exists
        if (user.profileImage) {
          fs.unlink(path.join(__dirname, '../uploads/profileImage', user.profileImage), (err) => {
            if (err) console.error('Failed to delete old profile image:', err);
          });
        }
        updateData.profileImage = uploadedFile.filename;  // Assuming you're storing the file name
      }
  
      // Hash the password if it is being updated
      if (password) {
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(password, saltRounds);
      }
  
      // Perform the update operation
      const updatedUser = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  
      res.status(200).send({ success: true, msg: 'User updated successfully', data: updatedUser });
    } catch (error) {
      console.error(error);
  
      // Delete the uploaded file if there is an error during registration
      if (uploadedFile) {
        fs.unlinkSync(path.join(__dirname, '../uploads/profileImage', uploadedFile.filename));
      }
  
      res.status(500).send({ success: false, msg: 'Error updating the user' });
    }
  };






// Delete controller --Delete
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ success: false, msg: 'User not found' });
    }

    // Delete the user's profile image if it exists
    if (user.profileImage) {
      fs.unlink(path.join(__dirname, '../uploads/profileImage', user.profileImage), (err) => {
        if (err) console.error('Failed to delete profile image:', err);
      });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(id);

    res.status(200).send({ success: true, msg: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, msg: 'Error deleting the user' });
  }
};


//login controller -- POST
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username});

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User not found",
            });
        }

        const userNotApproved = await User.findOne({ username: req.body.username , isApproved : true});

        if (!userNotApproved) {
            return res.status(401).send({
                success: false,
                message: "User not approved",
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password",
            });
        }

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "2d",
        });

        res.send({
            success: true,
            message: `Logged in as ${user.role}`,
            token: "Bearer " + token,
            username: user.username,
           
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error during login: " + error.message);
    }
};


//logout controller

exports.logout =  (req, res) => {
    console.log("Logging out...");
    res.clearCookie('token');
    res.redirect('/');
}