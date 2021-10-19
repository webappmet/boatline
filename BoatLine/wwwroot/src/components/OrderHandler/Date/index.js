import './styled.css'
import Input from '../../Input';

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
        <div>
            <h3 className="date__headline">When do you want to travel?</h3>
            <div className="dates">
                <div className="date-input">
                    <Input id="travel-date" value={dateFrom} type="date" label="Departure Date" validator={validDate}/>
                </div>
                <span className="trip-length">{dateUntil ? `You will arrive in ${destination} at: ${dateUntil}` : 'Select a departure date to see the arrival date.'}</span>
            </div>
        </div>
    );
}

export default DatePicker;