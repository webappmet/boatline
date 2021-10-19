import { useState, useEffect } from 'react';
import './styled.css'

const Input = ({ id, value, setValue, type, label, validator, recalculate }) => {
    
    const [valid, setValid] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const validate = async (value) => {
        if (!validator) return;
        let potentialError = await validator(value);
        if (typeof potentialError == 'string') {
            setErrorMessage(potentialError);
            setValid(false);
        }
        else if (potentialError) {
            setValid(true);
        }
    }
    
    useEffect(() => {
        if (value) validate(value);
    }, []);

    useEffect(() => {
        if (recalculate && value) validate(value);
    }, [recalculate])
    
    const handleChange = (event) => {
        let updated = event.target.value;
        validate(updated);
    }

    return (
        <div className="form-group">
            <label className="form-label" htmlFor={id}>{label}</label>
            <input className={`form-input ${valid === true ? 'valid' : valid === false ? 'nonvalid' : ''}`} id={id} value={value} onChange={handleChange} type={type} />
            {!valid ? (<span className="form-error-message">{errorMessage}</span>) : ''}
        </div>
    );
}

export default Input;