import React from 'react'
import './Home.css'
import Card from '../Card/Card';
import add from '../../assets/icons/add.svg'
import more from '../../assets/icons/more.svg'
import backlog from '../../assets/icons/backlog.svg'
import Cancelled from '../../assets/icons/Cancelled.svg'
import Done from '../../assets/icons/Done.svg'
import inprogress from '../../assets/icons/inprogress.svg'
import todo from '../../assets/icons/todo.svg'
import nopriority from '../../assets/icons/nopriority.svg'
import urgent from '../../assets/icons/urgent-color.svg'
import high from '../../assets/icons/high.svg'
import medium from '../../assets/icons/medium.svg'
import low from '../../assets/icons/low.svg'

const Home = ({tickets, selectedGrouping, selectedOrdering, users}) => {

  const groupTickets=(tickets, selectedGrouping)=>{
    switch(selectedGrouping){
      case 'status':
        return tickets.reduce((groups, ticket)=>{
          (groups[ticket.status]=groups[ticket.status] || []).push(ticket);
          return groups;
        },{});
      case 'userId':
        return tickets.reduce((groups, ticket)=>{
          (groups[ticket.userId]=groups[ticket.userId] || []).push(ticket);
          return groups;
        },{});
      case 'priority':
        return tickets.reduce((groups, ticket)=>{
          (groups[ticket.priority]=groups[ticket.priority] || []).push(ticket);
          return groups;
        },{});
      default:
        return tickets.reduce((groups, ticket)=>{
          (groups[ticket.status]=groups[ticket.status] || []).push(ticket);
          return groups;
        },{});
    }
  };

  const orderTickets=(tickets, selectedOrdering)=>{
    return [...tickets].sort((a, b)=>{
      if(selectedOrdering==='priority'){
        return b.priority-a.priority;
      }else if(selectedOrdering==='title'){
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupedTickets=groupTickets(tickets, selectedGrouping);
  const orderedTickets=Object.keys(groupedTickets).reduce((result, group)=>{
    result[group]=orderTickets(groupedTickets[group], selectedOrdering);
    return result;
  },{});

  const getInitials=(username)=>{
    if(!username) return '';
    const nameparts=username.split(' ');
    const initials=nameparts.map(part=> part.charAt(0).toUpperCase()).join('');
    return initials;
  }


  return (
    <div className='home'>
      {selectedGrouping==='status'?<div className='statusgrouping'>
        <div className="group-column">
            <div className='group-header'>
            <div className='group-header-title'>
              <img src={backlog} alt="B" />
            <h5>Backlog   {orderedTickets['Backlog']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['Backlog'] ? (
              orderedTickets['Backlog'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
              <img src={todo} alt="T" />
            <h5>Todo   {orderedTickets['Todo']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['Todo'] ? (
              orderedTickets['Todo'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
              <img src={inprogress} alt="I" />
            <h5>In progress   {orderedTickets['In progress']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['In progress'] ? (
              orderedTickets['In progress'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
              <img src={Done} alt="D" />
            <h5>Done   {orderedTickets['Done']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['Done'] ? (
              orderedTickets['Done'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
              <img src={Cancelled} alt="X" />
            <h5>Canceled   {orderedTickets['Canceled']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['canceled'] ? (
              orderedTickets['canceled'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
      </div>:selectedGrouping==='userId'?<div className='statusgrouping'>
        <div className="group-column">
            <div className='group-header'>
            <div className='group-header-title'>
            <div className="author" style={{backgroundColor: 'green'}}>
              {users?getInitials(users.find(user=>user.id==='usr-1')?.name):'U'}
              <div className='availability' style={{backgroundColor: users && users.find(user=>user.id==='usr-1')?.available ? 'green' : 'gray',}}></div>
            </div>
            <h5>{users.find(user=>user.id==='usr-1')?.name}   {orderedTickets['usr-1']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['usr-1'] ? (
              orderedTickets['usr-1'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
            <div className="author" style={{backgroundColor: 'brown'}}>
              {users?getInitials(users.find(user=>user.id==='usr-2')?.name):'U'}
              <div className='availability' style={{backgroundColor: users && users.find(user=>user.id==='usr-2')?.available ? 'green' : 'gray',}}></div>
            </div>
            <h5>{users.find(user=>user.id==='usr-2')?.name}   {orderedTickets['usr-2']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['usr-2'] ? (
              orderedTickets['usr-2'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
            <div className="author" style={{backgroundColor: 'blue'}}>
              {users?getInitials(users.find(user=>user.id==='usr-3')?.name):'U'}
              <div className='availability' style={{backgroundColor: users && users.find(user=>user.id==='usr-3')?.available ? 'green' : 'gray',}}></div>
            </div>
            <h5>{users.find(user=>user.id==='usr-3')?.name}   {orderedTickets['usr-3']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['usr-3'] ? (
              orderedTickets['usr-3'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
            <div className="author" style={{backgroundColor: 'pink'}}>
              {users?getInitials(users.find(user=>user.id==='usr-4')?.name):'U'}
              <div className='availability' style={{backgroundColor: users && users.find(user=>user.id==='usr-4')?.available ? 'green' : 'gray',}}></div>
            </div>
            <h5>{users.find(user=>user.id==='usr-4')?.name}   {orderedTickets['usr-4']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['usr-4'] ? (
              orderedTickets['usr-4'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
              <div className="author" style={{backgroundColor: 'red'}}>
              {users?getInitials(users.find(user=>user.id==='usr-5')?.name):'U'}
              <div className='availability' style={{backgroundColor: users && users.find(user=>user.id==='usr-5')?.available ? 'green' : 'gray',}}></div>
            </div>
            <h5>{users.find(user=>user.id==='usr-5')?.name}   {orderedTickets['usr-5']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['usr-5'] ? (
              orderedTickets['usr-5'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
      </div>:<div className='statusgrouping'>
        <div className="group-column">
            <div className='group-header'>
            <div className='group-header-title'>
              <img src={nopriority} alt="NP" />
            <h5>No priority   {orderedTickets['0']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['0'] ? (
              orderedTickets['0'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
              <img src={urgent} alt="U" />
            <h5>Urgent   {orderedTickets['4']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['4'] ? (
              orderedTickets['4'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
              <img src={high} alt="H" />
            <h5>High   {orderedTickets['3']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['3'] ? (
              orderedTickets['3'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
              <img src={medium} alt="M" />
            <h5>Medium   {orderedTickets['2']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['2'] ? (
              orderedTickets['2'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
          <div className="group-column">
          <div className='group-header'>
            <div className='group-header-title'>
              <img src={low} alt="L" />
            <h5>Low   {orderedTickets['1']?.length}</h5>
            </div>
            <div >
              <img src={add} alt="add" />
              <img src={more} alt="more" />
            </div>
            </div>
            {orderedTickets['1'] ? (
              orderedTickets['1'].map(ticket => <Card key={ticket.id} ticket={ticket} users={users}/>)
            ) : (
              <p className="empty-section">No tickets</p>
            )}
          </div>
      </div>}
    </div>
  )
}

export default Home