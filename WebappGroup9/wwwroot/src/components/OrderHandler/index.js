import { useState, useEffect } from 'react';
import { getRoutes, getCabins, saveTicket, getReferenceNumber, validatePayment } from '../../api/api';

import Walker from "../Walker";
import Route from "./Route";
import DateHandler from "./Date";
import Cabin from './Cabin';
import Travelers from './Travelers';
import Checkout from './Checkout';
import { navigate } from '../../Router';

const OrderHandler = () => {

    const [message, setMessage] = useState('');

    const [routes, setRoutes] = useState([]);
    const [cabins, setCabins] = useState([]);

    const [selectedRoute, setSelectedRoute] = useState();
    const [departure, setDeparture] = useState();
    const [destination, setDestination] = useState();
    const [dateFrom, setDateFrom] = useState('');
    const [dateUntil, setDateUntil] = useState();
    const [selectedCabins, setSelectedCabins] = useState([]);
    const [travelers, setTravelers] = useState([]);
    const [payment, setPayment] = useState({cardHolderName: '', cardNumber: '', csc: '', expirationMonth: '', expirationYear: ''});

    const fetchRoutes = async () => {
        try {
            const routes = await getRoutes();
            setDeparture(routes[0].departure)
            setDestination(routes[0].destination)
            setSelectedRoute(routes[0])
            setRoutes(routes);
        }
        catch (e) {
            setRoutes([]);
            setMessage("Could not load routes")
        }
    }

    const fetchCabins = async () => {
        try {
            let fetchedCabins = await getCabins();
            setCabins(fetchedCabins);
        }
        catch (e) {
            setCabins([]);
            setMessage("Could not load cabins")
        }
    }

    useEffect(() => {
        if (!departure || !destination) setSelectedRoute(routes[0])
        for (const route of routes) {
            console.log(departure, destination)
            if (route.departure === departure && route.destination === destination) {
                setSelectedRoute(route)
                return;
            }
            setSelectedRoute(null)
        }
    }, [departure, destination]);

    useEffect(() => {
        fetchRoutes();
        fetchCabins();
    }, [])

    useEffect(() => {
        if (selectedRoute && dateFrom) {
            let year = dateFrom.substring(0,4);
            let month = dateFrom.substring(5,7);
            let day = dateFrom.substring(8,10);

            let untilDate = new Date(year, month-1, day);

            untilDate.setDate(untilDate.getDate() + selectedRoute.durationDays);
            setDateUntil(untilDate.toDateString());
        }
        else {
            setDateUntil(null)
        }
    }, [dateFrom, selectedRoute])

    const createTicket = async (traveler) => {
        const referenceNumber = await getReferenceNumber({ firstName: traveler.firstName, lastName: traveler.lastName });
        if (referenceNumber) {
            let year = dateFrom.substring(2,4);
            let month = dateFrom.substring(5,7);
            let day = dateFrom.substring(8,10);

            const customer = {
                firstName: traveler.firstName,
                lastName: traveler.lastName,
                reference: referenceNumber.substring(0,3),
                postalCode: {
                    code: traveler.zip
                },
                payment: {
                    cardHolderName: payment.cardHolderName,
                    cardNumber: payment.cardNumber,
                    cSC: payment.csc,
                    expirationMonth: payment.expirationMonth,
                    expirationYear: payment.expirationYear
                },
                streetAddress: traveler.address,
                phone: traveler.phone,
                email: traveler.email,
                tickets: [
                    {
                        route: {
                            id: selectedRoute.id
                        },
                        cabins: [
                            {id: parseInt(traveler.room)}
                        ],
                        date: `${day}.${month}.${year}`,
                        reference: referenceNumber
                    }
                ]
            };
            const paymentOK = await validatePayment(customer.payment);
            if (paymentOK) {
                saveTicket(customer)
                return referenceNumber;
            }
        }
        return false;
    }

    const createTickets = async () => {
        const referenceNumbers = []
        for (const traveler of travelers) {
            const reference = await createTicket(traveler);
            if (reference) {
                referenceNumbers.push(reference);
            }
        }
        let params = '?';
        for (const refNr of referenceNumbers) {
            params += `r=${refNr}&`
        }
        params.pop()
        navigate(`/tickets${params}`);
    }

    const confirm = () => {
        createTickets()

        return "Thank you for ordering";
    }

    return (
        <Walker title="Order tickets" message={message} setMessage={setMessage} confirm={confirm} message={message} confirmMessage="Checkout">
            <Route routes={routes} setDeparture={setDeparture} setDestination={setDestination} destination={destination} departure={departure} />
            <DateHandler dateFrom={dateFrom} destination={destination} setDateFrom={setDateFrom} dateUntil={dateUntil} />
            <Cabin cabins={cabins} selectedCabins={selectedCabins} setSelectedCabins={setSelectedCabins} travelers={travelers} setTravelers={setTravelers} />
            <Travelers cabins={cabins} selectedCabins={selectedCabins} travelers={travelers} setTravelers={setTravelers}/>
            <Checkout payment={payment} setPayment={setPayment} />
        </Walker>
    );
}

export default OrderHandler;