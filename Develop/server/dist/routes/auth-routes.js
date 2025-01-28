"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if the user already exists
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Email already in use.' });
            return;
        }
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create the user
        await user_1.User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully!' });
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
});
exports.default = router;
