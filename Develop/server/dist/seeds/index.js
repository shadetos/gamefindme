"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_seeds_1 = require("./user-seeds");
const seedAll = async () => {
    try {
        await (0, user_seeds_1.seedUsers)();
        console.log('All data seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding data:', error);
    }
};
seedAll();
