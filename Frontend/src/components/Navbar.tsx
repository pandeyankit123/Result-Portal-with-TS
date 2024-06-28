import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ticon from "../assests/ticon.JPG";
import logo from "../assests/logo.jpeg";

interface TeacherDetails {
  tid: string;
  name: string;
  email: string;
}

const Navbar: React.FC<{ showAlert: (message: string, type: string) => void }> = (props) => {
  const host = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [teacherDetails, setTeacherDetails] = useState<TeacherDetails>({ tid: "", name: "", email: "" });

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.showAlert("Logged out Successfully", "success");
    navigate('/');
  }

  const fetchTeacherDetails = async () => {
    try {
      const response = await fetch(`${host}/auth/getteach`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token') || ""
        }
      });
      const json = await response.json();
      setTeacherDetails(json);
    } catch (error) {
      console.error('Failed to fetch teacher details:', error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
      <div className="container-fluid" >
        <Link className="navbar-brand" to="/"><img src={logo} style={{ borderRadius: "30px" }} alt="" width="30" height="30" className="mx-2 d-inline-block align-text-top" />Result Portal</Link>
        <div className="justify-content-end">
          {!localStorage.getItem('token') ? <form></form> :
            <div>
              <img
                src={ticon}
                alt=""
                width="35"
                height="35px"
                style={{ borderRadius: "25px", cursor: "pointer" }}
                className="mx-3 d-inline-block align-text-top dropdown-toggle"
                onClick={fetchTeacherDetails}
                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
              />
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <p className="dropdown-item my-1">{`tid: ${teacherDetails.tid}`}</p>
                <p className="dropdown-item my-1">{`Name: ${teacherDetails.name}`}</p>
                <p className="dropdown-item my-1">{`Email-id: ${teacherDetails.email}`}</p>
              </div>
              <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
            </div>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
