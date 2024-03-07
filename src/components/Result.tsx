import React, { useContext, useRef } from 'react';
import context from '../context/context';
import sclogo from "../assests/sclogo.png";
import watermark from '../assests/watermark.JPG';
import sign from '../assests/sign.jpg';
import html2pdf from 'html2pdf.js';
import moment from 'moment';

interface Student {
    name: string;
    sid: string;
    classn: string;
    Mname: string;
    Fname: string;
    DOB: Date;
    mScience: number;
    mMaths: number;
    mSST: number;
    mHindi: number;
    mEnglish: number;
    mCoo: number;
}

function Result() {
    const scontext = useContext(context);
    const { Student } = scontext;
    const cardMainRef = useRef<HTMLDivElement>(null);

    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const convertToWords = (num: number): string => {
        if (num === 0) return 'zero';
        if (num < 10) return ones[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
        if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' and ' + convertToWords(num % 100) : '');
        return '';
    };

    const convertToGrades = (num: number): string => {
        if (num === 100) return 'A++';
        if (num >= 95) return 'A+';
        if (num >= 90) return 'A';
        if (num >= 75) return 'B';
        if (num >= 60) return 'C';
        if (num >= 35) return 'D';
        return 'E';
    };

    const per = (num1: number, num2: number, num3: number, num4: number, num5: number, num6: number): number => {
        const value = num1 + num2 + num3 + num4 + num5 + num6;
        return (value / 600) * 100;
    };

    const res = (per: number): string => {
        if (per >= 75) return "PASS with 1st Div";
        if (per >= 60) return "PASS with 2nd Div";
        if (per >= 30) return "PASS with 3rd Div";
        return "FAIL";
    };

    const downloadPDF = () => {
        const cardMain = cardMainRef.current;
        if (!cardMain) return;

        const opt = {
            margin: 0.5,
            filename: `Result_${Student.name}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(cardMain).save();
    };


    return (
        <>
            <div style={{ minHeight: "950px", margin: "0 375px 50px 375px" }}>
                <div ref={cardMainRef} className="card" style={{ backgroundRepeat: "round", backgroundImage: `url(${watermark})` }}>
                    <div className="card-body">
                        <img className='sclogo mt-2' src={sclogo} style={{ display: "block", marginLeft: "auto", marginRight: "auto", filter: "grayscale(100%)", borderBottomLeftRadius: "55px 60px", borderBottomRightRadius: "60px 70px" }} width="100" height="100" alt="" /> <br />
                        <div className='text-center'>
                            <h2>ANKIT PANDEY SCHOOL OF EXCELLENCE</h2>
                            <h4>MARKS STATEMENT CUM CERTIFICATE</h4>
                        </div>
                        <br />
                        <div className='mt-2 mx-4'>
                            <pre className='my-0'>This is to certify that  <span className='h5'><b>{Student.name}</b></span></pre>
                            <pre className='my-0'>Student ID (sid)  <span className='h6'>{Student.sid}</span>                               of  Class  <span className='h6'>{Student.classn}</span></pre>
                            <pre className='my-0'>Mother's Name  <span className='h6'>{Student.Mname}</span></pre>
                            <pre className='my-0'>Father's Name  <span className='h6'>{Student.Fname}</span></pre>
                            <pre className='my-0'>Date of Birth  <span className='h6'>{moment(Student.DOB).format('dddd, Do MMMM YYYY')}</span></pre>
                            <br />
                            <p>has achieved Scholastic Achievements as under:</p>
                            <table className='table-sm table-bordered' style={{ width: "100%" }}>
                                <tr>
                                    <th rowSpan={2}> S. code</th>
                                    <th rowSpan={2}> Subject</th>
                                    <th colSpan={2}> Marks Obtained (Out of 100)</th>
                                    <th rowSpan={2}> Grades</th>
                                </tr>
                                <tr>
                                    <th>Marks</th>
                                    <th>In words</th>
                                </tr>
                                <tr>
                                    <td>001</td>
                                    <td>Science (SCI)</td>
                                    <td>{Student.mScience}</td>
                                    <td>{convertToWords(Student.mScience)}</td>
                                    <td>{convertToGrades(Student.mScience)}</td>
                                </tr>
                                <tr>
                                    <td>002</td>
                                    <td>Mathematics (MAT)</td>
                                    <td>{Student.mMaths}</td>
                                    <td>{convertToWords(Student.mMaths)}</td>
                                    <td>{convertToGrades(Student.mMaths)}</td>
                                </tr>
                                <tr>
                                    <td>003</td>
                                    <td>Social Studies (SST)</td>
                                    <td>{Student.mSST}</td>
                                    <td>{convertToWords(Student.mSST)}</td>
                                    <td>{convertToGrades(Student.mSST)}</td>
                                </tr>
                                <tr>
                                    <td>004</td>
                                    <td>Hindi (HIN)</td>
                                    <td>{Student.mHindi}</td>
                                    <td>{convertToWords(Student.mHindi)}</td>
                                    <td>{convertToGrades(Student.mHindi)}</td>
                                </tr>
                                <tr>
                                    <td>005</td>
                                    <td>English (ENG)</td>
                                    <td>{Student.mEnglish}</td>
                                    <td>{convertToWords(Student.mEnglish)}</td>
                                    <td>{convertToGrades(Student.mEnglish)}</td>
                                </tr>
                                <tr>
                                    <td>101</td>
                                    <td>Extra-Curricular Activities (ECA)</td>
                                    <td>{Student.mCoo}</td>
                                    <td>{convertToWords(Student.mCoo)}</td>
                                    <td>{convertToGrades(Student.mCoo)}</td>
                                </tr>
                            </table>
                            <br /><br />
                            <div className='row justify-content-sm-between px-3'>
                                <div>
                                    <pre>Percentage:  <span className='h6'>{per(Student.mScience, Student.mSST, Student.mMaths, Student.mHindi, Student.mEnglish, Student.mCoo)}%</span></pre>
                                    <pre>Result:  <span className='h6'><b>{res(per(Student.mScience, Student.mSST, Student.mMaths, Student.mHindi, Student.mEnglish, Student.mCoo))}</b></span></pre>
                                    <br /><br />
                                    <pre>Dated:  {moment().format('DD/MM/YY')}</pre>
                                </div>
                                <div style={{}}>
                                    <img src={sign} width="120" height="60" style={{ display: "block", marginLeft: "auto", marginRight: "auto", transform: "rotate(-20deg)", borderTopRightRadius: "120px 50px", borderBottomLeftRadius: "80px 50px", marginTop: "55px", filter: "contrast(200%)" }} alt="" />
                                    <p>Controller of Examinations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className='btn btn-secondary ' onClick={downloadPDF} style={{ width: "180px", borderRadius: "30px", display: "block", marginLeft: "auto", marginRight: "auto" }}>Download PDF</button>
            <br />
        </>
    )
}

export default Result;
