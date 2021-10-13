import './styled.css'
import Ticket from './Ticket.js';
import { useState, useEffect } from 'react';
import { getCabins, getRoute, getTicketsByReference } from '../../api/api';

const TicketList = () => {

    const [tickets, setTickets] = useState([]);
    const [referenceNumbers, setReferenceNumbers] = useState();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const reference = params.getAll('r')
        setReferenceNumbers(reference);
    }, [])

    const fetchTickets = async () => {
        const customers = await getTicketsByReference(referenceNumbers);

        if (customers) {
            const selectedTickets = []

            for (const customer of customers) {
                let ticket = customer.tickets.find((ticket) => ticket.reference === referenceNumber);
                let route = await getRoute(ticket.route.id);
                let cabin = await getCabin(ticket.cabins[0].id)
    
                if (route) {
                    selectedTickets.push({
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        reference: ticket.reference,
                        route: {
                            id: ticket.route.id,
                            departure: route.departure,
                            destination: route.destination
                        },
                        cabin: {
                            id: ticket.cabins[0].id,
                            type: cabin.type
                        },
                        date: ticket.date,
                        durationDays: route.durationDays,
                        durationHours: route.durationHours
                    })
                }
            }
            setTickets(selectedTickets);
        }
    }

    useEffect(() => {
        fetchTickets();
    }, [referenceNumbers])

    return (
        <div>
            <div className="ticket-display-heading">
                <h1 className="no-margin">Thank you for ordering!</h1>
                <p>Your tickets are listed bellow</p>
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

// {
//     totalPrice: 3000,
//     tickets: [
//         {
//             firstName: 'mats',
//             lastName: 'sommervold',
//             reference: 'JKL5JK4D',
//             route: {
//                 id: 3,
//                 departure: 'Oslo',
//                 destination: 'Kiel' 
//             },
//             cabin: {
//                 id: 301,
//                 type: 'First Class',
//                 price: 500,
//                 beds: 3
//             }
//             date: `14.10.2021`,
//             durationDays: 2,
//             durationHours: 14
//         }
//     ]
// }