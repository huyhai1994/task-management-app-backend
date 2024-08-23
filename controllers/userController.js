const User = require('../models/User');
const jwt = require('jsonwebtoken');

// User registration
exports.registerUser = async (req, res) => {
    const {email, password, name} = req.body;
    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }
        user = new User({email, password, name});
        await user.save();

        const payload = {user: {id: user.id}};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// User login
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
