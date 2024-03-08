const User = require('../models/userModel');
const bcrypt = requrie('bcrypt');
const saltRounds = 12;

// getting all users
const getAllUsers = async (req, res) => {
    try{
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

// finding user by name
const getUserByName = async (req, res) => {
    try{
        const user = await User.findOne({name: req.params.name});
        res.status(200).json(user);
    }
    catch(error){
        res.status(404).json({message: erros.message});
    }
}

// getting user by id
const getUserById = async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

// create a new user

// const createUser = async(req, res) => {
//     try{
//         const salt = await bcrypt.genSalt(saltRounds); // generating salt
//         const hashedPassword = await bcrypt.hash(req.body.password, salt); // hashing the password before saving in the database
//         const user = {
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//         }
//         const newUser = new User(user);
//         await newUser.save();
//     }
//     catch(error){
//         res.status(409).json({message: error.message});
//     }
// }

// update user details by 

const updateUser = async(req, res) =>{
    try{
        const user = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {new: true});
        res.status(200).json(updatedUser);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

// delete a user by id

const deleteUser = async(req, res) => {
    try{
        const deletedUser = await findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

module.exports = {getAllUsers, getUserByName, getUserById, updateUser, deleteUser};