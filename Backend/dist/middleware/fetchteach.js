"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = 'rpBackend';
const fetchteach = (req, res, next) => {
    // Get the teach from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
        return;
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Assuming 'teach' can be of any type
        req.teach = data.teach;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};
exports.default = fetchteach;
