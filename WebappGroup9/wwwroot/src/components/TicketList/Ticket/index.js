import { useEffect } from 'react';
import './styled.css';

const Ticket = (props) => {
    
    return (
        <div className="ticket">
            <ul className="ticket-properties">
                <li className="ticket-property">{props.ticket.departure}</li>
                <li className="ticket-property">{props.ticket.destination}</li>
                <li className="ticket-property">{props.ticket.name}</li>
                <li className="ticket-property">{props.ticket.address}</li>
                <li className="ticket-property">{props.ticket.phone}</li>
            </ul>
        </div>
    );
}

export default Ticket