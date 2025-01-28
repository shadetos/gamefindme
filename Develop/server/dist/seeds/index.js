"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_seeds_js_1 = require("./user-seeds.js");
const connection_js_1 = __importDefault(require("../config/connection.js"));
const seedAll = async () => {
    try {
        await connection_js_1.default.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');
        await (0, user_seeds_js_1.seedUsers)();
        console.log('\n----- USERS SEEDED -----\n');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedAll();
