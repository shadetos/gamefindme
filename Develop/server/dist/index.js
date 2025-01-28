"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./config/connection"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', auth_routes_1.default);
// Serve the client production build
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../Client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../Client/dist/index.html'));
    });
}
// Connect to the database and start the server
connection_1.default.sync().then(() => {
    console.log(`Connected to database successfully.`);
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
