"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const express_1 = __importDefault(require("express"));
const teachAuth_1 = __importDefault(require("./routes/teachAuth"));
const students_1 = __importDefault(require("./routes/students"));
const studR_1 = __importDefault(require("./routes/studR"));
require('dotenv').config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Available Routes
app.use('/auth', teachAuth_1.default);
app.use('/studs', students_1.default);
app.use('/result', studR_1.default);
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});
