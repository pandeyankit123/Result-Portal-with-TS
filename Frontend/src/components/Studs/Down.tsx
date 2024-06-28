import React, { useContext, useRef, useState } from 'react';
import context from '../../context/context';
import { utils as XLSXUtils, writeFile as writeExcelFile, read as readExcelFile, WorkBook, WorkSheet } from 'xlsx';
import moment from 'moment';

interface Student {
  id: string;
  sname: string;
  sFname: string;
  sMname: string;
  sDOB: string;
  sclassn: string;
  smScience: number;
  smMaths: number;
  smSST: number;
  smEnglish: number;
  smHindi: number;
  smCoo: number;
}

interface Props {
  showAlert: (message: string, type: string) => void;
}

const Down: React.FC<Props> = (props) => {
  const scontext = useContext(context);
  const { studs, addStud, currentPage, setCurrentPage, len, editStud } = scontext;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handlePrev = () => setCurrentPage(currentPage - 1);
  const handleNext = () => setCurrentPage(currentPage + 1);

  const fileInput = useRef<HTMLInputElement>(null);
  const reff = useRef<HTMLButtonElement>(null);
  const reffClose = useRef<HTMLButtonElement>(null);
  const [Sstud, setSstud] = useState<Student>({
    id: "",
    sname: "",
    sFname: "",
    sMname: "",
    sDOB: "",
    sclassn: "",
    smScience: 0,
    smMaths: 0,
    smSST: 0,
    smEnglish: 0,
    smHindi: 0,
    smCoo: 0
  });

  const add = () => {
    reff.current?.click();
  };

  const handleClick =  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    var prev=studs.length;
    addStud(Sstud.id, Sstud.sname, Sstud.sFname, Sstud.sMname, Sstud.sDOB, Sstud.sclassn, Sstud.smScience, Sstud.smMaths, Sstud.smSST, Sstud.smEnglish, Sstud.smHindi, Sstud.smCoo);
    var curr=studs.length;
    if(prev!==curr){
      reffClose.current?.click();
      setSstud({
        id: "",
        sname: "",
        sFname: "",
        sMname: "",
        sDOB: "",
        sclassn: "",
        smScience: 0,
        smMaths: 0,
        smSST: 0,
        smEnglish: 0,
        smHindi: 0,
        smCoo: 0
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSstud({ ...Sstud, [e.target.name]: e.target.value });
  };

  const exportToExcel = () => {
    // Create a new workbook
    const workbook: WorkBook = XLSXUtils.book_new();

    // Exclude the unwanted columns from the data
    const exportData: any = studs.map(({ sid, name, Fname, Mname, DOB, classn, mScience, mMaths, mSST, mEnglish, mHindi, mCoo }) => ({
      sid, name, Fname, Mname, DOB, classn, mScience, mMaths, mSST, mEnglish, mHindi, mCoo
    }));

    // Convert employee data to a worksheet
    const worksheet: WorkSheet = XLSXUtils.json_to_sheet(exportData);

    // Add the worksheet to the workbook
    XLSXUtils.book_append_sheet(workbook, worksheet, 'StudentList');

    // Generate an Excel file and download it
    writeExcelFile(workbook, 'StudentList.xlsx');
  };

  const importFromExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const binaryString = event.target?.result as string;
      const workbook = readExcelFile(binaryString, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSXUtils.sheet_to_json(worksheet, { header: 'A', blankrows: false });

      for (let i = 1; i < data.length; i++) {
        const student: any = data[i];
        const existingStudent = studs.find((s) => s.sid === student.A);
        if (existingStudent) {
          editStud(student.A, student.B, student.C, student.D, student.E, student.F, student.G, student.H, student.I, student.J, student.K, student.L);
        } else {
          addStud(student.A, student.B, student.C, student.D, student.E, student.F, student.G, student.H, student.I, student.J, student.K, student.L);
        }
      }

      console.log(data);

      reffClose.current?.click();
      props.showAlert("Data imported successfully, Refreshing...", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };

    reader.readAsBinaryString(file as Blob);
  };

  return (
    <>
      <div className="container-fluid">
        <div className='row pl-3' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <nav aria-label="Page navigation example" >
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePrev}>
                  &laquo;
                </button>
              </li>
              {Array.from({ length: len }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === len ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleNext}>
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>


          <button ref={reff} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
            Launch demo modal
          </button>
          <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add Student</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setSstud({ id: "", sname: "", sFname: "", sMname: "", sDOB: "", sclassn: "", smScience: 0, smMaths: 0, smSST: 0, smEnglish: 0, smHindi: 0, smCoo: 0 }); }}><i className="fa-solid fa-x"></i></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6" style={{ minHeight: "95px" }}>
                      <label htmlFor="eid" className="form-label">Sid</label>
                      <input type="text" className={`form-control ${Sstud.id.length < 3 ? 'is-invalid' : 'is-valid'}`} id="id" name="id" value={Sstud.id} placeholder="Enter the student ID" aria-describedby="emailHelp" onChange={onChange} minLength={3} required style={{ backgroundImage: "none" }} />
                      <small className={`form-text text-muted ${Sstud.id.length < 3 ? 'd-block' : 'd-none'}`}> Required: minLength 3</small>
                    </div>
                    <div className="col-md-6" style={{ minHeight: "95px" }}>
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className={`form-control ${Sstud.sname.length < 3 ? 'is-invalid' : 'is-valid'}`} id="sname" name="sname" value={Sstud.sname} placeholder="Name??" onChange={onChange} minLength={3} required style={{ backgroundImage: "none" }} />
                      <small className={`form-text text-muted  ${Sstud.sname.length < 3 ? 'd-block' : 'd-none'}`}> Required: minLength 3</small>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6" style={{ minHeight: "95px" }}>
                      <label htmlFor="Fname" className="form-label">Father's Name</label>
                      <input type="text" className={`form-control ${Sstud.sFname.length < 3 ? 'is-invalid' : 'is-valid'}`} id="sFname" name="sFname" value={Sstud.sFname} onChange={onChange} minLength={3} required style={{ backgroundImage: "none" }} />
                      <small className={`form-text text-muted ${Sstud.sFname.length < 3 ? 'd-block' : 'd-none'}`}> Required: minLength 3</small>
                    </div>
                    <div className="col-md-6" style={{ minHeight: "95px" }}>
                      <label htmlFor="Fname" className="form-label">Mother's Name</label>
                      <input type="text" className={`form-control ${Sstud.sMname.length < 3 ? 'is-invalid' : 'is-valid'}`} id="sMname" name="sMname" value={Sstud.sMname} onChange={onChange} minLength={3} required style={{ backgroundImage: "none" }} />
                      <small className={`form-text text-muted ${Sstud.sMname.length < 3 ? 'd-block' : 'd-none'}`}> Required: minLength 3</small>
                    </div>
                  </div>
                  <div className="row g-3 ">
                    <div className="col-md-6" style={{ minHeight: "95px" }}>
                      <label htmlFor="DOB" className="form-label">D.O.B</label>
                      <input type="date" className={`form-control ${Sstud.sDOB.length < 3 ? 'is-invalid' : 'is-valid'}`} id="sDOB" name="sDOB" value={moment(Sstud.sDOB).format('YYYY-MM-DD')} onChange={onChange} required style={{ backgroundImage: "none" }} />
                      <small className={`form-text text-muted ${Sstud.sDOB.length < 3 ? 'd-block' : 'd-none'}`}> Required</small>
                    </div>
                    <div className="col-md-6 " style={{ minHeight: "95px" }}>
                      <label htmlFor="classn" className="form-label">Class</label>
                      <input type="text" className={`form-control ${Sstud.sclassn.length < 3 ? 'is-invalid' : 'is-valid'}`} id="sclassn" name="sclassn" value={Sstud.sclassn} onChange={onChange} minLength={3} required style={{ backgroundImage: "none" }} />
                      <small className={`form-text text-muted ${Sstud.sclassn.length < 3 ? 'd-block' : 'd-none'}`}> Required: minLength 3</small>
                    </div>
                  </div>
                  <h4>Marks</h4>
                  <div className="row ">
                    <div className="col">
                      <label htmlFor="mScience" className="form-label">Science</label>
                      <input type="number" min="0" max="100" className="form-control" id="smScience" name="smScience" placeholder="Out of 100" value={Sstud.smScience} onChange={onChange} />
                    </div>
                    <div className="col">
                      <label htmlFor="mMaths" className="form-label">Maths</label>
                      <input type="number" min="0" max="100" className="form-control" id="smMaths" name="smMaths" placeholder="Out of 100" value={Sstud.smMaths} onChange={onChange} />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col">
                      <label htmlFor="mEnglish" className="form-label">English</label>
                      <input type="number" min="0" max="100" className="form-control" id="smEnglish" name="smEnglish" placeholder="Out of 100" value={Sstud.smEnglish} onChange={onChange} />
                    </div>
                    <div className="col">
                      <label htmlFor="mHindi" className="form-label">Hindi</label>
                      <input type="number" min="0" max="100" className="form-control" id="smHindi" name="smHindi" placeholder="Out of 100" value={Sstud.smHindi} onChange={onChange} />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col">
                      <label htmlFor="mSST" className="form-label">Social Studies</label>
                      <input type="number" min="0" max="100" className="form-control" id="smSST" name="smSST" placeholder="Out of 100" value={Sstud.smSST} onChange={onChange} />
                    </div>
                    <div className="col">
                      <label htmlFor="mCoo" className="form-label">Extracurricular Activity</label>
                      <input type="number" min="0" max="100" className="form-control" id="smCoo" name="smCoo" placeholder="Out of 100" value={Sstud.smCoo} onChange={onChange} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button ref={reffClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { setSstud({ id: "", sname: "", sFname: "", sMname: "", sDOB: "", sclassn: "", smScience: 0, smMaths: 0, smSST: 0, smEnglish: 0, smHindi: 0, smCoo: 0 }); }}>Close</button>
                  <button disabled={Sstud.sname.length < 3 || Sstud.sFname.length < 3 || Sstud.sMname.length < 3 || Sstud.sDOB.length < 3 || Sstud.sclassn.length < 3} onClick={handleClick} type="button" className="btn btn-primary">Add</button>
                </div>
              </div>
            </div>
          </div>


          <div className='pr-1'>
            <input ref={fileInput} type="file" className="form-control-file" accept=".xlsx,.xls" id="exampleInputFile" aria-describedby="fileHelp" style={{ display: 'none' }} onChange={importFromExcel} />

            <button className="btn btn-secondary btn-lg mx-2 " onClick={exportToExcel} title="Export to Excel"><i className='fas fa-file-export' style={{ fontSize: "25px" }}></i></button>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => { add() }} style={{ "alignItems": "center" }}>Add Student</button>
            <button className="btn btn-secondary btn-lg mx-2 " onClick={() => fileInput.current?.click()} title="Import from Excel"><i className='fas fa-file-import' style={{ fontSize: "25px", transform: 'scaleX(-1)' }}></i></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Down;
