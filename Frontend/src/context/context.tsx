import { createContext, Context } from "react";

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

interface StateContextType {
  studs: Student[];
  addStud: (sid: string, name: string, Fname: string, Mname: string, DOB: string, classn: string, mScience: number, mMaths: number, mSST: number, mEnglish: number, mHindi: number, mCoo: number) => void;
  deleteStud: (id: string) => void;
  editStud: (id: string, name: string, Fname: string, Mname: string, DOB: string, classn: string, mScience: number, mMaths: number, mSST: number, mEnglish: number, mHindi: number, mCoo: number) => void;
  getStuds: () => void;
  findStudById: (id: string) => void;
  findStudByName: (fname: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  len: number;
  setlen: (len: number) => void;
  sortField: string;
  setSortField: (field: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  Student: Student;
  setStudent: (student: Student) => void;
}

const context: Context<StateContextType> = createContext<StateContextType>({} as StateContextType);

export default context;
