import './styled.css'
import Input from '../../interface/control/Input';
import H3 from '../../type/H3';
import Align from '../../layout/Align';
import Stack from '../../layout/Stack';
import DeparturePicker from '../Pages/DeparturePicker';

const DatePicker = ({ date, setDate, dateValid, setDateValid, departure, setDeparture, route }) => {

    return (
        <Stack gap="4rem">
            <Align align="center">
                <H3 weight="400" size="2.2rem">When do you want to travel?</H3>
            </Align>
            <DeparturePicker date={date} setDate={setDate} dateValid={dateValid} setDateValid={setDateValid} departure={departure} setDeparture={setDeparture} route={route} />
        </Stack>
    );
}

export default DatePicker;