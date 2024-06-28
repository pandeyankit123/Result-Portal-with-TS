import React, { useContext, useEffect } from 'react';
import context from '../../context/context';
import Studlist from './Studlist';
import Up from './Up';
import Down from './Down';
interface Props {
  showAlert: (message: string, type: string) => void;
}

const Studs: React.FC<Props> = ({ showAlert }) => {
  const scontext = useContext(context);
  const { getStuds, currentPage, itemsPerPage } = scontext;
  useEffect(() => {
    getStuds();
  }, [currentPage, itemsPerPage, getStuds]);

  return (
    <div className="container">
      <br />
      <Up />
      <br />
      <Studlist showAlert={showAlert} />
      <br />
      <Down showAlert={showAlert} />
      <hr />
    </div>
  );
}

export default Studs;
