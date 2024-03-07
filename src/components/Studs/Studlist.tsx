import React, { useContext, useRef, useState } from 'react';
import context from '../../context/context';
import Item from './Item';
import moment from 'moment';

function Studlist(props: any) {
  const scontext = useContext(context);
  const { studs, editStud, currentPage, itemsPerPage, setCurrentPage, setlen, sortField, sortOrder } = scontext;

  const [selectedClass, setSelectedClass] = useState<string>('');

  const filteredItems = selectedClass
    ? studs.filter((stud: any) => stud.classn === selectedClass)
    : studs;

  const compareFields = (fieldA: string | number, fieldB: string | number) => {
    if (typeof fieldA === 'string') {
      return fieldA.localeCompare(fieldB.toString());
    } else if (typeof fieldA === 'number') {
      return fieldA - (fieldB as number);
    } else {
      // Add more type comparisons as needed
      return 0;
    }
  };

  const sortedItems = [...filteredItems].sort((a: any, b: any) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (sortOrder === 'asc') {
      return compareFields(fieldA, fieldB);
    } else {
      return compareFields(fieldB, fieldA);
    }
  });

  setlen(Math.ceil(sortedItems.length / itemsPerPage));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const ref = useRef<HTMLButtonElement>(null);
  const refClose = useRef<HTMLButtonElement>(null);
  const [Sstud, setSstud] = useState({
    id: '',
    sname: '',
    sFname: '',
    sMname: '',
    sDOB: '',
    sclassn: '',
    smScience: 0,
    smMaths: 0,
    smSST: 0,
    smEnglish: 0,
    smHindi: 0,
    smCoo: 0
  });

  const updateStud = (currentStud: any) => {
    if (ref.current) ref.current.click();
    setSstud({
      id: currentStud.sid,
      sname: currentStud.name,
      sFname: currentStud.Fname,
      sMname: currentStud.Mname,
      sDOB: currentStud.DOB,
      sclassn: currentStud.classn,
      smScience: currentStud.mScience,
      smMaths: currentStud.mMaths,
      smSST: currentStud.mSST,
      smEnglish: currentStud.mEnglish,
      smHindi: currentStud.mHindi,
      smCoo: currentStud.mCoo
    });
  };

  const handleClick = () => {
    if (editStud) editStud(Sstud.id, Sstud.sname, Sstud.sFname, Sstud.sMname, Sstud.sDOB, Sstud.sclassn, Sstud.smScience, Sstud.smMaths, Sstud.smSST, Sstud.smEnglish, Sstud.smHindi, Sstud.smCoo);
    if (props.showAlert) props.showAlert('Updated Successfully', 'success');
    if (refClose.current) refClose.current.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSstud({ ...Sstud, [e.target.name]: e.target.value });
  };

  const handleDepartmentFilter = (classn: string) => {
    setSelectedClass(classn);
    setCurrentPage(1);
  };

  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit & View Student</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-x"></i></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <label htmlFor="sid" className="form-label">Sid</label>
                  <input type="text" className="form-control" id="id" name="id" value={Sstud.id} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                </div>
                <div className="col">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="sname" name="sname" value={Sstud.sname} onChange={onChange} minLength={3} required />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="Fname" className="form-label">Father's Name</label>
                  <input type="text" className="form-control" id="sFname" name="sFname" value={Sstud.sFname} onChange={onChange} minLength={3} required />
                </div>
                <div className="col">
                  <label htmlFor="Fname" className="form-label">Mother's Name</label>
                  <input type="text" className="form-control" id="sMname" name="sMname" value={Sstud.sMname} onChange={onChange} minLength={3} required />
                </div>
              </div>
              <div className="row ">
                <div className="col">
                  <label htmlFor="DOB" className="form-label">D.O.B</label>
                  <input type="date" className="form-control" id="sDOB" name="sDOB" value={moment(Sstud.sDOB).format('YYYY-MM-DD')} onChange={onChange} />
                </div>
                <div className="col">
                  <label htmlFor="classn" className="form-label">Class</label>
                  <input type="text" className="form-control" id="sclassn" name="sclassn" value={Sstud.sclassn} onChange={onChange} />
                </div>
              </div> <br />
              <h4>Marks</h4>
              <div className="row ">
                <div className="col">
                  <label htmlFor="mScience" className="form-label">Science</label>
                  <input type="number" min={0} max={100} className="form-control" id="smScience" name="smScience" value={Sstud.smScience} onChange={onChange} />
                </div>
                <div className="col">
                  <label htmlFor="mMaths" className="form-label">Maths</label>
                  <input type="number" min={0} max={100} className="form-control" id="smMaths" name="smMaths" value={Sstud.smMaths} onChange={onChange} />
                </div>
              </div>
              <div className="row ">
                <div className="col">
                  <label htmlFor="mEnglish" className="form-label">English</label>
                  <input type="number" min={0} max={100} className="form-control" id="smEnglish" name="smEnglish" value={Sstud.smEnglish} onChange={onChange} />
                </div>
                <div className="col">
                  <label htmlFor="mHindi" className="form-label">Hindi</label>
                  <input type="number" min={0} max={100} className="form-control" id="smHindi" name="smHindi" value={Sstud.smHindi} onChange={onChange} />
                </div>
              </div>
              <div className="row ">
                <div className="col">
                  <label htmlFor="mSST" className="form-label">Social Studies</label>
                  <input type="number" min={0} max={100} className="form-control" id="smSST" name="smSST" value={Sstud.smSST} onChange={onChange} />
                </div>
                <div className="col">
                  <label htmlFor="mCoo" className="form-label">Extracurricular Activity</label>
                  <input type="number" min={0} max={100} className="form-control" id="smCoo" name="smCoo" value={Sstud.smCoo} onChange={onChange} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={Sstud.sname.length < 3} onClick={handleClick} type="button" className="btn btn-primary">Update Student</button>
            </div>
          </div>
        </div>
      </div>
      <div className="min-vh-70 border border-dark rounded" style={{ minHeight: "49vh" }}>
        <table className="table table-hover table-sm" style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th scope="col">S-id</th>
              <th scope="col">Name</th>
              <th scope="col">D.O.B</th>
              <th scope="col">
                <div className="dropdown show">
                  <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" style={{ color: 'black' }} aria-expanded="false"> Class </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="#" onClick={() => handleDepartmentFilter('')}> Clear Filter </a>
                  </div>
                </div>
              </th>
              <th scope="col">Science</th>
              <th scope="col">Maths</th>
              <th scope="col">SST</th>
              <th scope="col">English</th>
              <th scope="col">Hindi</th>
              <th scope="col">ECA</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <div className="container mx-2">
              {studs.length === 0 && 'No notes to display'}
            </div>
            {currentItems.map((stud: any) => {
              return <Item key={stud.sid} updateStud={updateStud} showAlert={props.showAlert} stud={stud} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Studlist;
