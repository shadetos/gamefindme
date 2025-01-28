"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = await models_1.User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Email already in use.' });
            return;
        }
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create the user
        await models_1.User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully!' });
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred during sign-up.' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await models_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials.' });
            return;
        }
        // Compare password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials.' });
            return;
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login successful.', token });
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});
exports.default = router;
