"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const models_1 = require("../models");
const seedUsers = async () => {
    try {
        await models_1.User.bulkCreate([
            {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            },
            {
                username: 'john',
                email: 'john@example.com',
                password: 'johnpassword',
            },
        ]);
        console.log('Users seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding users:', error);
    }
};
exports.seedUsers = seedUsers;
