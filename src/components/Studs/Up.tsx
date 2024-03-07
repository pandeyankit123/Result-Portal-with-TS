import React, { useContext, useState } from 'react';
import context from '../../context/context';

function Up() {
  const scontext = useContext(context);
  const { findStudById, findStudByName, getStuds, setCurrentPage, sortOrder, setSortOrder, setSortField } = scontext;
  const [searchType, setSearchType] = useState<string>('id');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };

  const handleSearch = async () => {
    if (searchType === 'id') {
      findStudById(searchTerm);
    } else if (searchType === 'name') {
      findStudByName(searchTerm);
    }
  };

  const Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearchTerm(e.target.value);
    getStuds();
  };

  const handleSort = (field: string) => {
    setCurrentPage(1);
    setSortField(field);
    setSortOrder('asc');

    // Trigger getStuds to apply sorting
    getStuds();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='form-inline' >
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search" value={searchTerm} onChange={Change} onKeyPress={(e) => { if (e.key === 'Enter') { handleSearch(); } }} />
          </div>
          <div className="form-group form-check form-check-inline mx-3">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="id" checked={searchType === 'id'} onChange={handleSearchTypeChange} />
            <label className="form-check-label" htmlFor="inlineRadio1">By Id</label>
          </div>
          <div className="form-group form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="name" checked={searchType === 'name'} onChange={handleSearchTypeChange} />
            <label className="form-check-label" htmlFor="inlineRadio2">By Name</label>
          </div>
        </div>
        <div className="btn-group">
          <button type="button" className="btn btn-secondary" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>Sort &#8645;</button>
          <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#" onClick={() => handleSort('name')}>Name</a>
            <a className="dropdown-item" href="#" onClick={() => handleSort('DOB')}>Date of Birth</a>
            <a className="dropdown-item" href="#" onClick={() => handleSort('sid')}>Student ID</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Up;
