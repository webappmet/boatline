import styled from 'styled-components';

import { useState, useEffect } from 'react';

import Interface from '../../../assets/styles/scoped/Interface';
import Label from './Label';
import Message from './Message';
import Stack from '../../layout/Stack';

const Input = ({ id, value, type, label, validator, recalculate }) => {
    
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
        <Stack gap=".3rem">
            <Label htmlFor={id}>{label}</Label>
            <InputField
                id={id} 
                value={value} 
                onChange={handleChange} 
                type={type}
                valid={valid}
            />
            <Message type="error" visible={!valid}>{errorMessage}</Message>
        </Stack>
    );
}

const InputField = styled.input`
    ${Interface}
`;

export default Input;