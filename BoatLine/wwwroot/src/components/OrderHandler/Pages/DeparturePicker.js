import Input from "../../interface/control/Input";
import Stack from "../../layout/Stack";
import List from '../../layout/List';
import Departure from '../../content/Departure';
import { getDeparturesByDateAndRoute } from "../../../api/departures"; 
import { useEffect, useState } from "react/cjs/react.development";

const DeparturePicker = ({ date, setDate, dateValid, setDateValid, departure, setDeparture, route }) => {
    const [departures, setDepartures] = useState([]);

    const validDate = (value) => {
        if (date !== value) setDeparture(null);
        if (!value) return
        setDate(value);
        let valid = value.match(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/) ? true : false;
        let year = parseInt(value.substring(0,4));
        let month = parseInt(value.substring(5,7));
        let day = parseInt(value.substring(8,10));
        let today = new Date();

        if (year === today.getFullYear()) {
            if (month === today.getUTCMonth() + 1) {
                if (day < today.getUTCDate()) {
                    valid = false;
                }
            }
            else if (month < today.getUTCMonth() + 1) {
                valid = false;
            }
        }
        else if (year < today.getFullYear()) {
            valid = false;
        }
        if (valid) setDateValid(true);
        else setDateValid(false);
        return valid ? true : 'Must be a date set in the future';
    }

    const fetchDepartures = async () => {
        const departures = await getDeparturesByDateAndRoute({ date, route: route && route.id });
        if (departures) setDepartures(departures);
    }

    useEffect(() => {
        if (dateValid) fetchDepartures();
        else {
            setDepartures([]);
            setDeparture();
        }
    }, [date])

    return (
        <Stack gap="3rem">
            <Input value={date} validator={validDate} id="order-date-picker" type="date" label="Departure Date" />
            <List>
                {departures.map((dep, index) => {
                    return (
                        <Departure selected={departure && dep.id === departure.id} action={setDeparture} key={index} departure={dep} />
                    );
                })}
            </List>
        </Stack>
    );
}

export default DeparturePicker;