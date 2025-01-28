"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.UserFactory = UserFactory;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Define the User class extending Sequelize's Model
class User extends sequelize_1.Model {
    // Method to hash and set the password for the user
    async setPassword(password) {
        const saltRounds = 10;
        this.password = await bcrypt_1.default.hash(password, saltRounds);
    }
}
exports.User = User;
// Define the UserFactory function to initialize the User model
function UserFactory(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'users', // Name of the table in PostgreSQL
        sequelize, // The Sequelize instance that connects to PostgreSQL
        hooks: {
            // Before creating a new user, hash and set the password
            beforeCreate: async (user) => {
                await user.setPassword(user.password);
            },
            // Before updating a user, hash and set the new password if it has changed
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    await user.setPassword(user.password);
                }
            },
        }
    });
    return User; // Return the initialized User model
}
