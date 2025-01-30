"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../../models/User")); // ✅ Ensure the correct import
const userRouter = (0, express_1.Router)();
// ✅ Route to get all users
userRouter.get('/', async (req, res, next) => {
    try {
        const users = await User_1.default.findAll({ attributes: ['id', 'username', 'email'] });
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        next(error); // Pass error to Express error handler
    }
});
// ✅ Route to add a friend
userRouter.post('/add-friend', (req, res, next) => {
    (async () => {
        try {
            const { userId, friendId } = req.body;
            if (!userId || !friendId) {
                res.status(400).json({ message: 'Both userId and friendId are required.' });
                return;
            }
            const user = await User_1.default.findByPk(userId);
            const friend = await User_1.default.findByPk(friendId);
            if (!user || !friend) {
                res.status(404).json({ message: 'User or friend not found.' });
                return;
            }
            if (typeof user.addFriend === 'function') {
                await user.addFriend(friend);
                res.status(200).json({ message: 'Friend added successfully!' });
            }
            else {
                res.status(500).json({ message: 'addFriend method not available.' });
            }
        }
        catch (error) {
            console.error('Error adding friend:', error);
            next(error); // Pass error to Express error handler
        }
    })();
});
exports.default = userRouter;
