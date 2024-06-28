import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import context from '../../context/context';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

interface StudentResult {
  rsid: string;
  rMname: string;
}

interface TeacherLogin {
  tlemailorId: string;
  tlpassword: string;
}

interface TeacherSignup {
  tsid: string;
  tsname: string;
  tsemail: string;
  tspassword: string;
  cpassword: string;
}

const LoginSignup: React.FC<{ showAlert: (message: string, type: string) => void }> = (props) => {
  const scontext = useContext(context)
  const { setStudent } = scontext;
  const [isteach, setisteach] = useState<boolean>(false);
  const [sres, setsres] = useState<StudentResult>({ rsid: "", rMname: "" });
  const [tlog, settlog] = useState<TeacherLogin>({ tlemailorId: "", tlpassword: "" });
  const [tsign, settsign] = useState<TeacherSignup>({ tsid: "", tsname: "", tsemail: "", tspassword: "", cpassword: "" });
  let navigate = useNavigate();

  const host = process.env.REACT_APP_BASE_URL;

  const handleToggle = (s: string) => {
    if (s === "student" && isteach) {
      setisteach(!isteach);
    } else if (s === "teacher" && !isteach) {
      setisteach(!isteach);
    }
  };

  const handleres = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/result/getStudentResult`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: sres.rsid, motherName: sres.rMname })
      });
      const data = await response.json();
      setStudent(data);
      props.showAlert("Result fetched in Successfully", "success");
      navigate("/result")
    } catch (error) {
      props.showAlert("Error fetching student result", "danger");
    }
  };
  
  const handletlogin = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${host}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: tlog.tlemailorId, tid: tlog.tlemailorId, password: tlog.tlpassword })
    });
    const json = await response.json()
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in Successfully", "success")
      navigate("/studs")
    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }

  const handletsign = async (e: FormEvent) => {
    e.preventDefault();
    if (tsign.tspassword.length < 5) {
      props.showAlert("Password must be at least 5 characters long", "danger");
      return;
    }

    if (tsign.tspassword === tsign.cpassword) {
      const response = await fetch(`${host}/auth/createteach`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tid: tsign.tsid, name: tsign.tsname, email: tsign.tsemail, password: tsign.tspassword })
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/studs")
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    } else {
      alert("Passwords do not match. Please re-enter.");
    }
  };

  const onChanger = (e: ChangeEvent<HTMLInputElement>) => {
    setsres({ ...sres, [e.target.name]: e.target.value })
  }

  const onChangetl = (e: ChangeEvent<HTMLInputElement>) => {
    settlog({ ...tlog, [e.target.name]: e.target.value })
  }

  const onChanges = (e: ChangeEvent<HTMLInputElement>) => {
    settsign({ ...tsign, [e.target.name]: e.target.value })
  }

  return (
    <div className="hero" style={{maxHeight:"90vh"}}>
      <div className="form-box">
        <div className="button-box">
          <button type="button" className={`toggle-btn ${!isteach ? 'active' : ''}`} onClick={() => handleToggle('student')}> Student </button>
          <button type="button" className={`toggle-btn ${isteach ? 'active' : ''}`} onClick={() => handleToggle('teacher')}> Teacher </button>
        </div>

        <form onSubmit={handleres} id="student" className={`input-group ${isteach ? 'hidden' : ''}`}>
          <input type="text" className="input-field" value={sres.rsid} onChange={onChanger} name="rsid"  placeholder="Student Id (sid)" required />
          <input type="text" className="input-field" value={sres.rMname} onChange={onChanger} name="rMname"  placeholder="Mother's name" required />
          <button type="submit" className="submit-btn" style={{ borderRadius: "30px", margin: "30px auto" }}> Get Result </button>
        </form>

        <form onSubmit={handletlogin} id="teacher" className={`input-group ${!isteach ? 'hidden' : ''}`}>
          <input type="text" className="input-field" value={tlog.tlemailorId} onChange={onChangetl} id="tlemailorId" name="tlemailorId" placeholder="Enter Email-id or tid" required />
          <input type="password" className="input-field" value={tlog.tlpassword} onChange={onChangetl} name="tlpassword" id="tlpassword" placeholder="Enter Password" required />
          <p className='an'>Don't have an account? <a data-toggle="modal" data-target="#exampleModalLong" style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Sign Up</a></p>
          <button type="submit" className="submit-btn" style={{ borderRadius: "30px", margin: "30px auto" }}> Log In </button>
        </form>

        <div className="modal fade" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Sign Up</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="eid" className="form-label">Tid</label>
                    <input type="text" className="form-control" id="id" name="tsid" onChange={onChanges} placeholder="Enter tid" aria-describedby="emailHelp" required />
                  </div>
                  <div className="col">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="tsname" onChange={onChanges} placeholder="Enter name" minLength={3} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail id</label>
                  <input type="text" className="form-control" id="email" name="tsemail" onChange={onChanges} placeholder="Enter email" minLength={5} required />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name="tspassword" onChange={onChanges} minLength={5} placeholder="Password" />
                  </div>
                  <div className="col">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="cPassword" name="cpassword" onChange={onChanges} minLength={5} placeholder="Password" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button disabled={tsign.tsname.length < 3 || tsign.tsemail.length < 5} onClick={handletsign} type="button" className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
