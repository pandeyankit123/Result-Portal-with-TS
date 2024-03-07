import express, { Request, Response } from 'express';
import Student from '../models/Student';

const router = express.Router();

router.post('/getStudentResult', async (req: Request, res: Response) => {
    const { id, motherName } = req.body as { id: string, motherName: string };

    let student = await Student.findOne({ sid: id, Mname: motherName });

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
});

export default router;
