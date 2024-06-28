"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Student_1 = __importDefault(require("../models/Student"));
const router = express_1.default.Router();
router.post('/getStudentResult', async (req, res) => {
    const { id, motherName } = req.body;
    let student = await Student_1.default.findOne({ sid: id, Mname: motherName });
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
});
exports.default = router;
