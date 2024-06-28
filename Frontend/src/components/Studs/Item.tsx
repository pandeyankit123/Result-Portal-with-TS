import React, { useContext } from 'react';
import context from "../../context/context";
import moment from 'moment';

interface Props {
  stud: {
    sid: string;
    name: string;
    DOB: Date;
    classn: string;
    mScience: number;
    mMaths: number;
    mSST: number;
    mEnglish: number;
    mHindi: number;
    mCoo: number;
  };
  updateStud: (stud: any) => void; // Replace 'any' with the actual type of 'stud'
  showAlert: (message: string, type: string) => void;
}

function Item(props: Props) {
  const scontext = useContext(context);
  const { deleteStud } = scontext;
  const { stud, updateStud } = props;

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Student?');  

    if (isConfirmed) {
      deleteStud(stud.sid);
      props.showAlert('Deleted Successfully', 'success');
    }
  };

  return (
    <>
      <tr>
        <th scope="row">{stud.sid}</th>
        <td>{stud.name}</td>
        <td>{moment(stud.DOB).format('DD MMM YYYY')}</td>
        <td>{stud.classn}</td>
        <td>{stud.mScience}</td>
        <td>{stud.mMaths}</td>
        <td>{stud.mSST}</td>
        <td>{stud.mEnglish}</td>
        <td>{stud.mHindi}</td>
        <td>{stud.mCoo}</td>
        <td>
          <button className="btn btn-sm btn-info mx-1" onClick={() => { updateStud(stud) }}><i className="far fa-edit"></i></button>
          <button className="btn btn-sm btn-danger mx-1" onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
    </>
  );
}

export default Item;
