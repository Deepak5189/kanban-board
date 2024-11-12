import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'

function App() {

  const [loading, setLoading]=useState(true);
  const [error, seterror]=useState(false);

  const [tickets, setTickets]=useState([]);
  const [users, setUsers]=useState([]);
  const [selectedOrdering, setSelectedOrdering]=useState('priority');
  const [selectedGrouping, setselectedGrouping]=useState('status');

  
  useEffect(() => {
    const fetchTickets=async ()=>{
      try {
        
        const response=await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');

        if(!response.ok){
          throw new Error('Network connection failed');
        }

        const data= await response.json();
        console.log(data);
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (err) {
        seterror(true)
      }finally{
        setLoading(false)
        console.log(selectedGrouping, selectedOrdering);
      }
    }
    localStorage.setItem('latestState', JSON.stringify({selectedGrouping, selectedOrdering}))
    fetchTickets();
  
  }, []);

  useEffect(()=>{
    localStorage.setItem('latestState', JSON.stringify({selectedGrouping, selectedOrdering}));
  },[selectedGrouping, selectedOrdering]);

  useEffect(()=>{
    const newState=localStorage.getItem('latestState');
     if(newState.selectedGrouping && newState.selectedOrdering){
      console.log(newState)
      setselectedGrouping(newState.selectedGrouping);
      setSelectedOrdering(newState.selectedOrdering);
     }
  },[]);
  console.log(selectedGrouping,selectedOrdering);

  if(loading){
    return (
      <>
        Loading.... Please wait.
      </>
    )
  }else if(error){
    return (
      <>
        Some error occured...... Please refresh the page.
      </>
    )
  }
  

  return (
    <>
      <Navbar selectedGrouping={selectedGrouping} selectedOrdering={selectedOrdering} setSelectedOrdering={setSelectedOrdering} setselectedGrouping={setselectedGrouping} />
      <Home tickets={tickets} selectedGrouping={selectedGrouping} selectedOrdering={selectedOrdering} users={users} />
    </>
  )
}

export default App
