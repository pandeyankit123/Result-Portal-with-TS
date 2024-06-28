import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
    teach: string;
    sid: string;
    name: string;
    Fname: string;
    Mname: string;
    DOB: Date;
    class: string;
    mScience: number;
    mMaths: number;
    mSST: number;
    mEnglish: number;
    mHindi: number;
    mCoo: number;
}

const StudentSchema: Schema = new Schema({
    teach: {
        type: String,
        ref: 'teach'
    },
    sid: {
        type: String,
        required: [true, 'Employee required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name required']
    },
    Fname: {
        type: String,
        required: [true, 'Father\'s Name required']
    },
    Mname: {
        type: String,
        required: [true, 'Mother\'s Name required']
    },
    DOB: {
        type: Date,
        required: true
    },
    classn: {
        type: String,
        required: [true, 'class required']
    },
    mScience: {
        type: Number,
        default: 0
    },
    mMaths: {
        type: Number,
        default: 0
    },
    mSST: {
        type: Number,
        default: 0
    },
    mEnglish: {
        type: Number,
        default: 0
    },
    mHindi: {
        type: Number,
        default: 0
    },
    mCoo: {
        type: Number,
        default: 0
    }
});

const Student = mongoose.model<IStudent>('Stud', StudentSchema);

export default Student;
