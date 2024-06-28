import mongoose, { Schema, Document } from 'mongoose';

interface ITeacher extends Document {
    tid: string;
    name: string;
    email: string;
    password: string;
}

const TeacherSchema: Schema = new Schema({
    tid: {
        type: String,
        required: [true, 'Teacher required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name required']
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Enter email in valid format']
    },
    password: {
        type: String,
        required: true
    }
});

const TeacherModel = mongoose.model<ITeacher>('teacher', TeacherSchema);

export default TeacherModel;
