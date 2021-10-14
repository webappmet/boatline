import './styled.css'
import Ticket from './Ticket.js';
import { useState, useEffect } from 'react';
import { getTicketsByReference } from '../../api/api';

const TicketList = () => {

    const [tickets, setTickets] = useState([]);
    const [referenceNumbers, setReferenceNumbers] = useState();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const reference = params.getAll('r')
        setReferenceNumbers(reference);
    }, [])

    const fetchTickets = async () => {
        if (!referenceNumbers) return;
        const customers = await getTicketsByReference(referenceNumbers);

        if (customers) {
            const selectedTickets = []

            for (const [index, customer] of customers.entries()) {
                let ticket = customer.tickets.find((ticket) => ticket.reference === referenceNumbers[index]);
    
                if (ticket) {
                    selectedTickets.push({
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        reference: ticket.reference,
                        route: {
                            id: ticket.route.id,
                            departure: ticket.route.departure,
                            destination: ticket.route.destination,
                            durationDays: ticket.route.durationDays,
                            durationHours: ticket.route.durationHours
                        },
                        cabin: {
                            id: ticket.cabins[0].id,
                            type: ticket.cabins[0].type
                        },
                        date: ticket.date
                    })
                }
            }
            setTickets(selectedTickets);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            fetchTickets();
        }, 500)
    }, [referenceNumbers])

    return (
        <div>
            <div className="ticket-display-heading">
                <h1 className="no-margin">{tickets.length === 0 ? 'No ticket found' : 'Thank you for ordering!'}</h1>
                <p>{tickets.length === 0 ? 'Have you spelled the reference number right?' : 'Your tickets are listed bellow'}</p>
            </div>
            <div className="ticket-display-list">
                {tickets.map((ticket) => {
                    return (
                        <Ticket key={ticket.reference} ticket={ticket} />
                    );
                })}
            </div>
        </div>
    );
}

export default TicketList;