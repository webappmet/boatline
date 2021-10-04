import './styled.css'
import Input from '../../Input';

const Date = ({ dateFrom, setDateFrom, destination, dateUntil }) => {

    const validDate = (date) => {
        if (!date) return
        let valid = date.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) ? true : false;
        if (valid) setDateFrom(date);
        return valid;
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

export default Date;