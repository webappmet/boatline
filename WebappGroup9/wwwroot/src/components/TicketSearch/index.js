import { useState } from 'react/cjs/react.development';
import { navigate } from '../../Router';
import Input from '../Input';
import './styled.css'

const TicketSearch = () => {

    const [reference, setReference] = useState('');
    const [valid, setValid] = useState(false);

    const validateReference = (value) => {
        value = value.toUpperCase();
        let valid = false;
        let refNr = '';
        if (value.length > 8) return;
        for (let i = 0; i < value.length; i++) {
            if (i > 7) break;
            if (value[i].match(/^[0-9A-F]{1}$/g)) {
                refNr += value[i];
                if (i === 7) valid = true;
                else valid = false;
            }
        }
        setReference(refNr);
        setValid(valid);
        return valid || 'Reference numbers are 8 characters';
    }

    return (
        <div className="search-box">
            <h2 className="search-text">Search ticket by reference</h2>
            <Input id="search-ticket" value={reference} validator={validateReference} />
            <button class="search-button" disabled={!valid} onClick={() => navigate(`/tickets?r=${reference}`)}>Find Ticket</button>
        </div>
    );
}

export default TicketSearch;