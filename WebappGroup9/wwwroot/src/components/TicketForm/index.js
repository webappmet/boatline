import { useState, useEffect } from 'react';
import Input from '../Input';
import Select from '../Select';
import valid from './validator';
import './styled.css'

const TicketFrom = () => {
    
    const [ready, setReady] = useState(false);
    const [validList, setValidList] = useState([]);
    
    const saveTicket = () => {
        if (ready) {
            // post to server
            alert("creating ticket");
        }
    }
    
    useEffect(() => {
        let r = true;
        const thresold = ['departure-date', 'arrival-date', 'cabin', 'first-name', 'last-name', 'address', 'phone', 'email']
        for (const id of thresold) {
            if (validList.indexOf(id) === -1) r = false;
        }
        setReady(r);
    }, [validList])
    
    const validate = (validator) => (id, value) => {
        const res = validator(value);
        if (res === true) {
            if(validList.indexOf(id) === -1) {
                setValidList([...validList, id])
            }
        }
        else {
            let i = validList.indexOf(id);
            if (i !== -1) {
                setValidList([...validList].splice( i,1))
            }
        }
    }
    
    return (
        <form action="">
            <h1 className="form-title">New Ticket</h1>
            <div className="grid">
                <div className="form-group">
                    <Select id="route" value="" label="Route" name="Route" options={['oslo-københavn', 'stockholm-narvik']} />
                    <Input id="departure-date" value="" label="Departure Date" type="date" validator={validate(valid.date)}/>
                    <Input id="arrival-date" value="" label="Arrival Date" type="date" validator={validate(valid.date)}/>
                    <Select id="cabin" value="" label="Cabin" name="Cabin" options={['Single room', 'Double room']}/>
                </div>
                <div className="form-group">
                    <Input id="first-name" value="" label="First Name" type="text" validator={validate(valid.name)}/>
                    <Input id="last-name" value="" label="Last Name" type="text" validator={validate(valid.name)}/>
                    <Input id="address" value="" label="Address" type="text" validator={validate(valid.address)}/>
                    <Input id="phone" value="" label="Phone" type="text" validator={validate(valid.phone)}/>
                    <Input id="email" value="" label="Email" type="email" validator={validate(valid.email)}/>
                </div>
            </div>
            <div className="form-error">
                <p className="form-error-message"></p>
            </div>
            <div className="form-submit right">
                <button disabled={!ready} className="form-button" onClick={saveTicket}>Save Ticket</button>
            </div>
        </form>
    );
}

export default TicketFrom;