import React, { useState } from "react";
import context from "./context";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Student {
  sid: string;
  name: string;
  Fname: string;
  Mname: string;
  DOB: string;
  classn: string;
  mScience: number;
  mMaths: number;
  mSST: number;
  mEnglish: number;
  mHindi: number;
  mCoo: number;
}

const State: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const host = process.env.REACT_APP_BASE_URL;

  const [Student, setStudent] = useState<Student>({} as Student);

  const [studs, setStuds] = useState<Student[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);

  const [len, setlen] = useState<number>(Math.ceil(studs.length / itemsPerPage));

  const [sortField, setSortField] = useState<string>('sid');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  // Get all
  const getStuds = async () => {
    const response = await fetch(`${host}/studs/allstuds`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token') || ''
      }
    });
    const json = await response.json();
    setStuds(json);
  };

  // Add
  const addStud = async (sid: string, name: string, Fname: string, Mname: string, DOB: string, classn: string, mScience: number, mMaths: number, mSST: number, mEnglish: number, mHindi: number, mCoo: number) => {
    try {
      const response = await fetch(`${host}/studs/addstud`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify({
          sid, name, Fname, Mname, DOB, classn, mScience, mMaths, mSST, mEnglish, mHindi, mCoo
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.msg || 'Failed to add student');
        toast.error(errorData.msg || 'Failed to add student', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return;
      }
  
      const stud = await response.json();
      setStuds((prevStuds) => prevStuds.concat(stud));
    } catch (error: any) {
      console.error('Error:', error.message);
      toast.error("An error occurred while adding the student", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  // FindById
  const findStudById = async (id: string) => {
    const newStud = studs.filter((stud) => stud.sid.includes(id));
    setStuds(newStud);
  };

  // FindByName
  const findStudByName = async (fname: string) => {
    const newStud = studs.filter((stud) => stud.name.toLowerCase().includes(fname.toLowerCase()));
    setStuds(newStud);
  };

  // Edit
  const editStud = async (id: string, name: string, Fname: string, Mname: string, DOB: string, classn: string, mScience: number, mMaths: number, mSST: number, mEnglish: number, mHindi: number, mCoo: number) => {
    const response = await fetch(`${host}/studs/updatestud/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token') || ''
      },
      body: JSON.stringify({ name, Fname, Mname, DOB, classn, mScience, mMaths, mSST, mEnglish, mHindi, mCoo })
    });
    const json = await response.json();
    console.log(json);
    let newStuds = JSON.parse(JSON.stringify(studs));
    // Logic to edit
    for (let index = 0; index < newStuds.length; index++) {
      const element = newStuds[index];
      if (element.sid === id) {
        newStuds[index].name = name;
        newStuds[index].Fname = Fname;
        newStuds[index].Mname = Mname;
        newStuds[index].DOB = DOB;
        newStuds[index].classn = classn;
        newStuds[index].mScience = mScience;
        newStuds[index].mMaths = mMaths;
        newStuds[index].mSST = mSST;
        newStuds[index].mEnglish = mEnglish;
        newStuds[index].mHindi = mHindi;
        newStuds[index].mCoo = mCoo;
        break;
      }
    }
    setStuds(newStuds);
  };

  // Delete
  const deleteStud = async (id: string) => {
    try {
      const response = await fetch(`${host}/studs/deletestud/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token') || ''
        },
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        const newStud = studs.filter((stud) => stud.sid !== id);
        setStuds(newStud);
      } else {
        console.error('Failed to delete student:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <context.Provider value={{ studs, addStud, deleteStud, editStud, getStuds, findStudById, findStudByName, currentPage, setCurrentPage, itemsPerPage, len, setlen, sortField, setSortField, sortOrder, setSortOrder, Student, setStudent }}>
      {props.children}
    </context.Provider>
  );
};
export default State;
