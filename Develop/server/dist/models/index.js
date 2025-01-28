"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const connection_js_1 = __importDefault(require("../config/connection.js"));
const user_js_1 = require("./user.js");
const User = (0, user_js_1.UserFactory)(connection_js_1.default);
exports.User = User;
