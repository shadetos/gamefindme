"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const index_js_1 = require("../models/index.js");
const seedUsers = async () => {
    await index_js_1.User.bulkCreate([
        { username: 'JollyGuru', email: 'jolly@guru.com', password: 'password' },
        { username: 'SunnyScribe', email: 'sunny@scribe.com', password: 'password' },
        { username: 'RadiantComet', email: 'radiant@comet.com', password: 'password' },
    ], { individualHooks: true });
};
exports.seedUsers = seedUsers;
