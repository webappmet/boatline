import { useState } from 'react';
import { getCityByZip } from "../../../api/api";
import Input from "../../interface/control/Input";

const Traveler = ({ person, traveler, updateTraveler, index, removeSelf }) => {

    const [city, setCity] = useState('');

    const fetchCity = async (zip) => {
        const postalCode = await getCityByZip(zip);
        if (postalCode) {
            setCity(postalCode.name);
            return true;
        }
        return false;
    }

    const validator = {
        firstName: (value) => {
            const valid = value.match(/^[A-ZÆØÅ][a-zæøå]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/g)
            updateTraveler(index, {...traveler, firstName: value, validFirstName: valid});
            return valid ? true : 'Not a valid first name';
        },
        lastName: (value) => {
            const valid = value.match(/^[A-ZÆØÅ][a-zæøå]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/g)
            updateTraveler(index, {...traveler, lastName: value, validLastName: valid});
            return valid ? true : 'Not a valid first name';
        }, 
        email: (value) => {
            const emailRegex = RegExp(/^[a-zæøåA-ZÆØÅ0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g);
            const valid = value.match(emailRegex)
            updateTraveler(index, {...traveler, email: value, validEmail: valid});
            return valid ? true : 'Must be a valid email';
        },
        phone: (value) => {
            const phoneRegex = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g);
            const valid = value.match(phoneRegex)
            updateTraveler(index, {...traveler, phone: value, validPhone: valid});
            return valid ? true : 'Must ba a valid phone number';
        },
        address: (value) => {
            const valid = value.match(/^[#.0-9a-zæøåA-ZÆÅ\s,-]+$/g);
            updateTraveler(index, {...traveler, address: value, validAddress: valid});
            return valid ? true : 'Not a valid address';
        },
        zip: async (value) => {
            if (value.length > 4) return false;
            let reason
            let valid = value.match(/^[0-9]{4}$/g);
            updateTraveler(index, {...traveler, zip: value, validZip: valid});
            if (valid) {
                let city = await fetchCity(value);
                if (!city) {
                    valid = false;
                    reason = 'Zip does not exist';
                }
            }
            else setCity('');
            return valid || reason || 'Zip should be 4 numbers';
        }
    }

    return (
        <div className="traveler-form">
            <div className="traveler-form-heading">
                <h3>Person {person}:</h3>
                <button className="remove-traveler-button" type="button" onClick={() => removeSelf(index)}>X</button>
            </div>
            <div className="grid-2">
                <Input id={`first-name${traveler.id}`} label="First Name" value={traveler.firstName} type="text" validator={validator.firstName}/>
                <Input id={`last-name${traveler.id}`} label="Last Name" value={traveler.lastName} type="text" validator={validator.lastName} />
            </div>
            <div className="grid-2">
                <Input id={`phone${traveler.id}`} label="Phone" value={traveler.phone} type="text" validator={validator.phone} />
                <Input id={`email${traveler.id}`} label="Email" value={traveler.email} type="text" validator={validator.email} />
            </div>
            <div>
                <Input id={`address${traveler.id}`} label="Street Address" value={traveler.address} type="text" validator={validator.address}/>
            </div>
            <div className="grid-2">
                <Input id={`zip${traveler.id}`} label="Zip" value={traveler.zip} type="text" validator={validator.zip}/>
                <span className="city-zip">{city}</span>
            </div>
        </div>
    );
}

export default Traveler;