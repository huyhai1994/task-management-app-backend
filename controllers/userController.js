const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Add this line to import bcrypt
const User = require('../models/User');

// Register new user
exports.registerUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        // Check if user already exists
        let user = await User.findOne({username});
        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }

        // Create new user
        user = new User({username, password});

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({msg: 'User registered successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const payload = {user: {id: user.id}};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};