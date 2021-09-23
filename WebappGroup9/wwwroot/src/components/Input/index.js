import { useState, useEffect } from 'react';
import './styled.css'

const Input = ({ id, value, type, label, validator }) => {
    
    const [currentValue, setValue] = useState('');
    const [valid, setValid] = useState(null);
    
    useEffect(() => {
        setValue(value);
        setValid(validator(value));
    }, []);
    
    const handleChange = (event) => {
        let updated = event.target.value;
        setValue(updated);
        setValid(validator(id, updated));
    }

    return (
        <div className="form-group">
            <label className="form-label" htmlFor={id}>{label}</label>
            <input className={`form-input ${valid === true ? 'valid' : valid === false ? 'nonvalid' : ''}`} id={id} value={currentValue} onChange={handleChange} type={type} />
        </div>
    );
}

export default Input;