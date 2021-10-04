﻿import { useEffect } from 'react';
import './styled.css';

const Ticket = (props) => {
    
    return (
        <div className="ticket">
            <div className="travel-details">
                <h3 className="travel-destination">{props.ticket.departure} - {props.ticket.destination}</h3>
                <p className="travel-date">{props.ticket.date}</p>
            </div>
            <ul className="ticket-properties">
                <li className="ticket-property">{props.ticket.name}</li>
                <li className="ticket-property">{props.ticket.address}</li>
                <li className="ticket-property">{props.ticket.phone}</li>
            </ul>
        </div>
    );
}

export default Ticket