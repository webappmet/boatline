import { useState, useEffect } from 'react';
import './styled.css';
import Ticket from './Ticket';

const sampleTicket = { 
    departure: 'oslo', 
    destination: 'københavn',
    date: '1. sept 2021',
    name: 'ulrik nome sommer', 
    address: 'ca st.hans', 
    phone: '3402849032'
}

const sampleTicket2 = {
    departure: 'oslo',
    destination: 'københavn',
    date: '1. sep 2021',
    name: 'ulrik nome sommer',
    address: 'ca st.hans',
    phone: '3402849032'
}

const TicketList = () => {
    
    const [tickets, setTickets] = useState([sampleTicket, sampleTicket2])
    
    useEffect(() => {
        // Fetch tickets from server
    }, []);
    
    return (
        <div>
            <h1>Tickets</h1>
            <ul className="ticket-list">
                {tickets.map((ticket, i) => {
                    return <Ticket key={i} ticket={ticket} />;
                })}
            </ul>
        </div>
    );
    
}

export default TicketList;