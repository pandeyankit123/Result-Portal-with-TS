"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchteach_1 = __importDefault(require("../middleware/fetchteach"));
const Student_1 = __importDefault(require("../models/Student"));
const router = express_1.default.Router();
// ROUTE 1: Get All the Students using: GET "/students/allstuds". Login required
router.get('/allstuds', fetchteach_1.default, async (req, res) => {
    try {
        const students = await Student_1.default.find({ teach: req.teach.tid });
        res.json(students);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 2: Add a new Student using: POST "/api/notes/addstud". Login required
router.post('/addstud', fetchteach_1.default, async (req, res) => {
    try {
        const checkid = await Student_1.default.findOne({ sid: req.body.sid });
        if (checkid) {
            if (checkid.teach !== req.teach.tid) {
                return res.status(400).send({ msg: "Student is allready enrolled with another teacher" });
            }
            else
                return res.status(400).send({ msg: "Student allready exist with this teacher" });
        }
        else {
            const newstud = new Student_1.default({ ...req.body, teach: req.teach.tid });
            const savedstud = await newstud.save();
            res.status(201).json(savedstud);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 3: Update an existing Student using: PUT "/api/notes/updatestud". Login required
router.put('/updatestud/:id', fetchteach_1.default, async (req, res) => {
    try {
        const stud = await Student_1.default.findOne({ sid: req.params.id });
        if (!stud) {
            return res.status(404).json({ error: 'Student not found' });
        }
        if (stud.teach.toString() !== req.teach.tid) {
            return res.status(401).send("Not Allowed");
        }
        const updatedStud = await Student_1.default.findOneAndUpdate({ sid: req.params.id }, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json({ message: 'Student updated successfully', stud: updatedStud });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// ROUTE 4: Delete an existing Student using: DELETE "/notes/deletestud". Login required
router.delete('/deletestud/:id', fetchteach_1.default, async (req, res) => {
    try {
        const stud = await Student_1.default.findOne({ sid: req.params.id });
        if (!stud) {
            return res.status(404).send("Not Found");
        }
        if (stud.teach.toString() !== req.teach.tid) {
            return res.status(401).send("Not Allowed");
        }
        await Student_1.default.findOneAndDelete({ sid: req.params.id });
        res.json({ "Success": "Student has been deleted", stud: stud });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
exports.default = router;
