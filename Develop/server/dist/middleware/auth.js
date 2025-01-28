"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY || '';
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Invalid token
            }
            // Ensure decoded payload has a username
            const payload = decoded;
            if (!payload.username) {
                return res.sendStatus(403);
            }
            req.user = { username: payload.username };
            next();
        });
    }
    else {
        res.sendStatus(401); // No token provided
    }
};
exports.authenticateToken = authenticateToken;
