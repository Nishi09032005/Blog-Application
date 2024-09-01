const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register controller
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the user already exists
        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(400).json({msg:"email already exists"})
        }
        const userCreated = await User.create(
            {
                username,
                email,
                password
            })
            res.status(200).json({
                msg: "User created successfully",
                token:await userCreated.generateToken(),userId:userCreated._id
            })

    } catch (error) {
        return res.status(500).json({ error: error.message });
        next(error)
    }
};

// Login controller
const login = async (req, res) => {

    try {
        // Check if the user exists by email
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }else{
            res.status(200).json({
                msg: "User logged in successfully",
                token:await user.generateToken(),userId:user._id
            })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
