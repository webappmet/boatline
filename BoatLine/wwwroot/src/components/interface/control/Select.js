import styled from 'styled-components';

import Interface from '../../../assets/styles/scoped/Interface';
import Stack from '../../layout/Stack';
import Label from './Label';

const Select = ({ name, label, id, options, changeHandler, value }) => {

    return (
        <Stack gap=".3rem">
            <Label htmlFor={id}>{label}</Label>
            <StyledSelect value={value} onChange={changeHandler} name={name} id={id}>
                {options ? options.map((value, i) => <option key={i} value={value}>{value}</option>) : null}
            </StyledSelect>
        </Stack>  
    );
}

const StyledSelect = styled.select`
    ${Interface}
`;

export default Select;