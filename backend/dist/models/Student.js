"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const StudentSchema = new mongoose_1.Schema({
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
const Student = mongoose_1.default.model('Stud', StudentSchema);
exports.default = Student;
