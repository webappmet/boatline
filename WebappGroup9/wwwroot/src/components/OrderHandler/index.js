import { useState, useEffect } from 'react';
import { getRoutes, getCabins } from '../../api/api';

import Walker from "../Walker";
import Route from "./Route";
import DateHandler from "./Date";
import Cabin from './Cabin';
import Travelers from './Travelers';

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
        console.log(selectedRoute, dateFrom)
        if (selectedRoute && dateFrom) {
            let year = dateFrom.substring(0,4);
            let month = dateFrom.substring(5,7);
            let day = dateFrom.substring(8,10);

            let untilDate = new Date(year, month-1, day);

            untilDate.setDate(untilDate.getDate() + selectedRoute.duration);
            setDateUntil(untilDate.toDateString());
        }
        else {
            setDateUntil(null)
        }
    }, [dateFrom, selectedRoute])

    const confirm = () => {
        return "Thank you for ordering"
    }

    return (
        <Walker title="Order tickets" message={message} setMessage={setMessage} confirm={confirm} message={message}>
            <Route routes={routes} setDeparture={setDeparture} setDestination={setDestination} destination={destination} departure={departure} />
            <DateHandler dateFrom={dateFrom} destination={destination} setDateFrom={setDateFrom} dateUntil={dateUntil} />
            <Cabin cabins={cabins} selectedCabins={selectedCabins} setSelectedCabins={setSelectedCabins} />
            <Travelers />
        </Walker>
    );
}

export default OrderHandler;