const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    // 1. Validation Logic (Requirement 5)
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    const { username, email, password } = req.body;

    try {
        // 2. Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // 3. Hash Password (Requirement 4)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create User
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        // 5. Generate JWT
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during registration');
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user and explicitly select password (because select: false in Model)
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        // 2. Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        // 3. Create Token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during login');
    }
};