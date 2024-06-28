"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Teacher_1 = __importDefault(require("../models/Teacher"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fetchteach_1 = __importDefault(require("../middleware/fetchteach"));
const JWT_SECRET = 'rpBackend';
const router = express_1.default.Router();
// ROUTE 1: Create a Teacher using: POST "/auth/createteach". No login required
router.post('/createteach', [
    (0, express_validator_1.body)('tid', 'Enter a valid id').isLength({ min: 2 }),
    (0, express_validator_1.body)('name', 'Enter a valid name').isLength({ min: 3 }),
    (0, express_validator_1.body)('email', 'Enter a valid email').isEmail(),
    (0, express_validator_1.body)('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        // Check whether the teach with this email exists already
        let teach = await Teacher_1.default.findOne({ email: req.body.email });
        if (teach) {
            return res.status(400).json({ success, error: "Sorry a teacher with this email already exists" });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const secPass = await bcryptjs_1.default.hash(req.body.password, salt);
        // Create a new teacher
        teach = await Teacher_1.default.create({
            tid: req.body.tid,
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            teach: {
                tid: teach.tid
            }
        };
        const authtoken = jsonwebtoken_1.default.sign(data, JWT_SECRET);
        // res.json(teach)
        success = true;
        res.json({ success, authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 2: Authenticate a Teacher using: POST "/auth/login". No login required
router.post('/login', [
    (0, express_validator_1.body)('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, tid, password } = req.body;
    try {
        let teach;
        if (!teach) {
            teach = await Teacher_1.default.findOne({ email });
        }
        if (!teach) {
            teach = await Teacher_1.default.findOne({ tid });
        }
        if (!teach) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcryptjs_1.default.compare(password, teach.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const data = {
            teach: {
                tid: teach.tid
            }
        };
        const authtoken = jsonwebtoken_1.default.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 3: Get loggedin Teacher Details using: POST "/auth/getteach". Login required
router.post('/getteach', fetchteach_1.default, async (req, res) => {
    try {
        const teachId = req.teach.tid;
        const teach = await Teacher_1.default.findOne({ tid: teachId }).select("-password");
        res.send(teach);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
