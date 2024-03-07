import express, { Request, Response } from 'express';
import fetchteach from '../middleware/fetchteach';
import Student from '../models/Student';

const router = express.Router();

// ROUTE 1: Get All the Students using: GET "/students/allstuds". Login required
router.get('/allstuds', fetchteach, async (req: Request, res: Response) => {
    try {
        const students = await Student.find({ teach: req.teach.tid });
        res.json(students);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Student using: POST "/api/notes/addstud". Login required
router.post('/addstud', fetchteach, async (req: Request, res: Response) => {
    try {
        const checkid = await Student.findOne({ sid: req.body.sid });
        if (checkid) {
            res.status(400).send("Student already exists");
        } else {
            const newstud = new Student({ ...req.body, teach: req.teach.tid });
            const savedstud = await newstud.save();
            res.status(201).json(savedstud);
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Update an existing Student using: PUT "/api/notes/updatestud". Login required
router.put('/updatestud/:id', fetchteach, async (req: Request, res: Response) => {
    try {
        const stud = await Student.findOne({ sid: req.params.id });
        if (!stud) {
            return res.status(404).json({ error: 'Student not found' });
        }

        if (stud.teach.toString() !== req.teach.tid) {
            return res.status(401).send("Not Allowed");
        }

        const updatedStud = await Student.findOneAndUpdate(
            { sid: req.params.id },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Student updated successfully', stud: updatedStud });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ROUTE 4: Delete an existing Student using: DELETE "/notes/deletestud". Login required
router.delete('/deletestud/:id', fetchteach, async (req: Request, res: Response) => {
    try {
        const stud = await Student.findOne({ sid: req.params.id });
        if (!stud) {
            return res.status(404).send("Not Found");
        }

        if (stud.teach.toString() !== req.teach.tid) {
            return res.status(401).send("Not Allowed");
        }

        await Student.findOneAndDelete({ sid: req.params.id });
        res.json({ "Success": "Student has been deleted", stud: stud });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
