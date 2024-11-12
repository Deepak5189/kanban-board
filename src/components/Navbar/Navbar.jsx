import React, { useState } from 'react'
import './Navbar.css'
import displayIcon from '../../assets/icons/Display.svg'
import downIcon from '../../assets/icons/down.svg'

const Navbar = ({selectedGrouping, selectedOrdering, setSelectedOrdering, setselectedGrouping}) => {

  const [isVisible, setIsVisible]=useState(false);

  const handleDisplay=()=>{
    setIsVisible(!isVisible);
  }

  return (
    <>
      <nav className='header-nav'>
      <button className='display-button' onClick={handleDisplay}>
        <img src={displayIcon} alt="Display Icon" className='option-icon' /> Display
        <img src={downIcon} alt="Down Icon" className='down-icon' />
      </button>
      </nav>
      {isVisible &&<div className='selection-div'>
        <div className='selection-dropdown'>
          Grouping
          <select id="dropdown" value={selectedGrouping} onChange={(e)=>{setselectedGrouping(e.target.value)}} className='dropdown'>
            <option value="status">Status</option>
            <option value="userId">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className='selection-dropdown'>
          Ordering
          <select id="dropdown" value={selectedOrdering} onChange={(e)=>{setSelectedOrdering(e.target.value)}} className='dropdown'>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>}
    </>
  )
}

export default Navbar