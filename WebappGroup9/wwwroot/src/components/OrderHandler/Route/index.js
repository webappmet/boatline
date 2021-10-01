import { useEffect, useState } from 'react';
import Select from '../../Select';
import './styled.css';

const Route = ({ routes, setDeparture, setDestination, departure, destination }) => {

    const [departureList, setDepartureList] = useState();
    const [destinationList, setDestinationList] = useState();

    const updateDestChoise = (departure) => {
        let desList = [];
        for (const route of routes) {
            if (route[0] === departure && desList.indexOf(route[1]) === -1) desList.push(route[1]);
        }
        setDestinationList(desList);
    }

    useEffect(() => {
        let depList = [];
        for (const route of routes) {
            if (depList.indexOf(route[0]) === -1) depList.push(route[0])
        }
        setDepartureList(depList);
        updateDestChoise(departure);
    }, [routes])

    const departureChange = (event) => {
        setDeparture(event.target.value);
        updateDestChoise(event.target.value);
    }

    const destinationChange = (event) => {
        setDestination(event.target.value)
    }

    return (
        <div className="route">
            <div className="departure">
                <Select changeHandler={departureChange} id="departure" value={departure} label="Departure" name="Departure" options={departureList} />
            </div>
            <div className="destination">
                <Select changeHandler={destinationChange} id="destination" value={destination} label="Destination" name="Destination" options={destinationList} />
            </div>
        </div>        
    );
}

export default Route;