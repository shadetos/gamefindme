"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.sequelize = void 0;
const connection_1 = __importDefault(require("../config/connection"));
exports.sequelize = connection_1.default;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
