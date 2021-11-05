import { useEffect, useState } from 'react';
import Select from '../../interface/control/Select';
import './styled.css';

const Route = ({ routes, setDeparture, setDestination, departure, destination }) => {

    const [departureList, setDepartureList] = useState();
    const [destinationList, setDestinationList] = useState();

    const updateDestChoise = (departure) => {
        let desList = [];
        for (const route of routes) {
            if (route.departure === departure && desList.indexOf(route.destination) === -1) desList.push(route.destination);
        }
        setDestinationList(desList);
        setDestination(desList[0])
    }

    useEffect(() => {
        let depList = [];
        for (const route of routes) {
            if (depList.indexOf(route.departure) === -1) depList.push(route.departure)
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
        <div>
            <h3 className="route__headline">Where do you want to go?</h3>
            <div className="route">
                <div className="departure">
                    <Select changeHandler={departureChange} id="departure" value={departure} label="Departure" name="Departure" options={departureList} />
                </div>
                <div className="destination">
                    <Select changeHandler={destinationChange} id="destination" value={destination} label="Destination" name="Destination" options={destinationList} />
                </div>
            </div>
        </div>        
    );
}

export default Route;