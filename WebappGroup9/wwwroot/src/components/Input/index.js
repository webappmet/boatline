import { useState, useEffect } from 'react';
import './styled.css'

const Input = ({ id, value, setValue, type, label, validator }) => {
    
    const [valid, setValid] = useState(null);
    
    useEffect(() => {
        setValid(validator(value));
    }, []);
    
    const handleChange = (event) => {
        let updated = event.target.value;
        setValid(validator(updated));
    }

    return (
        <div className="form-group">
            <label className="form-label" htmlFor={id}>{label}</label>
            <input className={`form-input ${valid === true ? 'valid' : valid === false ? 'nonvalid' : ''}`} id={id} value={value} onChange={handleChange} type={type} />
        </div>
    );
}

export default Input;