"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Access to .env variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_1 = require("sequelize");
// Creating a connection object
const sequelize = process.env.DB_URL
    ? new sequelize_1.Sequelize(process.env.DB_URL)
    : new sequelize_1.Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
exports.default = sequelize;
