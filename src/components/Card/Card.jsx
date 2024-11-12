import React from 'react'
import './Card.css'
import urgent from '../../assets/icons/urgent-color.svg'
import urgent_grey from '../../assets/icons/urgent-grey.svg'
import high from '../../assets/icons/high.svg'
import medium from '../../assets/icons/medium.svg'
import low from '../../assets/icons/low.svg'
import no from '../../assets/icons/nopriority.svg'

const Card = ({ticket, users}) => {
  const priorities=[no, low, medium, high, urgent];
  const user=users.find((u)=>u.id===ticket.userId);

  const getInitials=(username)=>{
    if(!username) return '';
    const nameparts=username.split(' ');
    const initials=nameparts.map(part=> part.charAt(0).toUpperCase()).join('');
    return initials;
  }


  const profileColor={
    'usr-1': 'green',
    'usr-2': 'brown',
    'usr-3': 'blue',
    'usr-4': 'pink',
    'usr-5': 'red',
  };

  return (
    <>
      <div className="card">
        <div className="header">
          <h6>{ticket.id}</h6>
          <div className="author" style={{backgroundColor: profileColor[user.id]}}>
            {user?getInitials(user.name):'U'}
            <div className='availability' style={{backgroundColor: user && user.available ? 'green' : 'gray',}}></div>
          </div>
        </div>
        <div className='ticket-main'>
          <h4 className='ticket-title'>{ticket.title}</h4>
          <div className='footer'>
            <img src={priorities[+ticket.priority]} alt="priority" />
            {ticket.tag.map((tag)=>(
              <span key={tag} className='tag'>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Card