"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./config/connection"));
const index_1 = __importDefault(require("./routes/api/index"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// ✅ Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ✅ Ensure the API routes are correctly mounted
app.use('/api', index_1.default);
// ✅ Database Sync & Start Server
connection_1.default.sync().then(() => {
    console.log('Database synced successfully!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
