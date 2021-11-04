import './styled.css'
import Input from '../../interface/control/Input';
import H3 from '../../type/H3';
import Align from '../../layout/Align';
import Stack from '../../layout/Stack';
import DepartureList from '../../../containers/DepartureList';
import Panel from '../../interface/module/Panel';

const DatePicker = ({ dateFrom, setDateFrom, destination, dateUntil, setDateValid }) => {

    const validDate = (date) => {
        if (!date) return
        let valid = date.match(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/) ? true : false;
        let year = parseInt(date.substring(0,4));
        let month = parseInt(date.substring(5,7));
        let day = parseInt(date.substring(8,10));
        let today = new Date();
        setDateFrom(date);
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

    return (
        <Stack gap="4rem">
            <Align align="center">
                <H3 weight="400" size="2.2rem">When do you want to travel?</H3>
            </Align>
            <DepartureList items={5} navigable={false} routeFilter={false} />
            <div className="dates">
                <div className="date-input">
                    <Input id="travel-date" value={dateFrom} type="date" label="Departure Date" validator={validDate}/>
                </div>
                <span className="trip-length">{dateUntil ? `You will arrive in ${destination} at: ${dateUntil}` : 'Select a departure date to see the arrival date.'}</span>
            </div>
        </Stack>
    );
}

export default DatePicker;