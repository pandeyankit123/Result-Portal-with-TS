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
    <div className="container-fluid">
      <div className="row pl-3">
        <div className="col-12 col-md-8 align-items-center">
          <div className="form-inline flex-grow-1">
            <div className='row'>
            <div className="form-group mb-2 mr-sm-2">
              <input
                type="text"
                className="form-control w-100"
                placeholder="Search"
                value={searchTerm}
                onChange={Change}
                onKeyPress={(e) => { if (e.key === 'Enter') { handleSearch(); } }}
              />
            </div>
            <div style={{display: "flex"}}>
            <div className="form-group form-check form-check-inline mb-2 mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="id"
                checked={searchType === 'id'}
                onChange={handleSearchTypeChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio1" ><pre style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0", fontSize: "17px"}}>By Id</pre></label>
            </div>
            <div className="form-group form-check form-check-inline mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="name"
                checked={searchType === 'name'}
                onChange={handleSearchTypeChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2"><pre style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0", fontSize: "17px"}}>By Name</pre></label>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 text-md-right">
          <div className="btn-group mb-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              Sort &#8645;
            </button>
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <button className="dropdown-item" onClick={() => handleSort('name')}>Name</button>
              <button className="dropdown-item" onClick={() => handleSort('DOB')}>Date of Birth</button>
              <button className="dropdown-item" onClick={() => handleSort('sid')}>Student ID</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Up;
