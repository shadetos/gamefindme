"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express")); // Import types for req and res
const connection_js_1 = __importDefault(require("./config/connection.js")); // Ensure this points to the correct path
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve the client production build
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../Client/dist')));
    // Add type annotations for req and res
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../Client/dist/index.html'));
    });
}
// Connect to the database and start the server
connection_js_1.default.sync().then(() => {
    console.log(`Connected to database successfully.`);
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
