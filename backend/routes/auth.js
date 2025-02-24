const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'DiPAK!123ghuGE';
// ROUTE 1: CREATE USER
router.post('/createUser', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
], async (req, res) => {
    const result = validationResult(req);
    let success = false;
    if (!result.isEmpty()) {
        return res.status(400).send({ success, errors: result.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "This email is already exist! try next." });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        await user.save();
        res.json({ success, authToken });
    } catch (error) {
        success = false;
        res.status(500).json({ success, error: error.errmsg });
    }
})

// ROUTE 2: login user
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').exists().withMessage('Password must be at least 5 characters')
], async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ success, errors: result.array() });

    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success, error: "Invalid credentials." });
        }
        const passwordCompaire = await bcrypt.compare(password, user.password);
        if (!passwordCompaire) {
            return res.status(400).json({ success, error: "Invalid credentials." });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    }
    catch (error) {
        success = false;
        res.status(500).send({ success, error: error.errmsg });
    }
});

// ROUTE 3: Get loggedIn User details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findById(id).select("-password");
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error.errmsg);
    }
})

module.exports = router;