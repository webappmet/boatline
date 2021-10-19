import Input from '../../Input';
import './styled.css';
import { useEffect, useState } from 'react';

const Checkout = ({ travelers, cabins, payment, setPayment }) => {

    const [totalPrice, setTotalPrice] = useState(0);
    const [lastCardNumber, setLastCardNumber] = useState('');
    const [recalculateMonth, setRecalculateMonth] = useState(false);

    useEffect(() => {
        let price = 0;
        for (const traveler of travelers) {
            let cabin = cabins.find((cabin) => traveler.room === cabin.id);
            price += cabin.price;
        }
        setTotalPrice(price);
    }, [travelers, cabins]);

    const updatePayment = (updated) => {
        if (updated.validCardNumber && updated.validCec && updated.validExpirationMonth && updated.validExpirationYear && updated.validCardHolderName) {
            updated.valid = true;
        }
        else updated.valid = false;
        setPayment(updated);
    }

    const validator = {
        cardNumber: (value) => {
            let valueWithSpace = value;
            value = value.replaceAll(' ', '');
            let valid = false;
            let fullNumber = '';
            if (lastCardNumber.charAt(lastCardNumber.length - 1) === ' ' && lastCardNumber.length > valueWithSpace.length) value = value.slice(0, -1);
            for (let i = 0; i < value.length; i++) {
                if (i > 15) break;
                if (value[i].match(/^[0-9]{1}$/g)) {
                    fullNumber += value[i];
                    if ((i + 1) % 4 === 0 && i !== 15) {
                        fullNumber += ' ';
                    }
                    if (i === 15) valid = true;
                    else valid = false;
                }
            }
            setLastCardNumber(fullNumber);
            updatePayment({...payment, cardNumber: fullNumber, validCardNumber: valid});
            return valid || 'Card number must be 16 didgits';
        },
        csc: (value) => {
            let fullNumber = '';
            let valid = false;
            for (let i = 0; i < value.length; i++) {
                if (i > 2) break;
                if (value[i].match(/^[0-9]{1}$/g)) {
                    fullNumber += value[i];
                    if (i === 2) valid = true;
                    else valid = false;
                }
            }
            updatePayment({...payment, csc: fullNumber, validCec: valid });
            return valid || 'Must be 3 digits';
        },
        cardHolderName:(value) => {
            value = value.toUpperCase();
            const valid = value.match(/^((?:[A-ZÆØÅ]+ ?){1,3})$/g)
            updatePayment({...payment, cardHolderName: value, validCardHolderName: valid});
            return valid || 'Not a valid card holder name';
        },
        expirationMonth: (value) => {
            setRecalculateMonth(false);
            const digitRegex = RegExp(/^[0-9]{1}$/g);
            let valid = false;
            let month = '';
            if (value.length > 2) return;
            if (value.length > 0) {
                if (value[0] === '0' || value[0] === '1') month = value[0];
                if (value.length > 1) {
                    if (value[0] === '0' && value[1].match(digitRegex)) {
                        valid = true;
                        month += value[1];
                    }
                    if (value[0] === '1' && value[1].match(/^[0-2]{1}$/g)) {
                        valid = true;
                        month += value[1];
                    }
                }
            }
            let reason
            if (payment.expirationYear == new Date().getFullYear().toString().substring(2,5)) {
                if (month <= new Date().getUTCMonth() + 1) valid = false;
                reason = 'Card has expired';
            }

            updatePayment({...payment, expirationMonth: month, validExpirationMonth: valid});
            return valid || reason || 'Must be a 2 digit month number';
        },
        expirationYear: (value) => {
            const digitRegex = RegExp(/^[0-9]{1}$/g);
            let valid = false;
            let year = '';
            const currentYear = new Date().getFullYear().toString().substring(2, 5)
            if (value.length > 2) return;
            if (value.length > 0) {
                if (value[0] >= currentYear[0]) year = value[0];
                if (value.length > 1) {
                    if (value[0] > currentYear[0] && value[1].match(digitRegex)) {
                        valid = true;
                        year += value[1];
                    }
                    if (value[0] === currentYear[0] && value[1] >= currentYear[1]) {
                        valid = true;
                        year += value[1];
                    }
                }
            }
            updatePayment({...payment, expirationYear: year, validExpirationYear: valid});
            setRecalculateMonth(true);
            return valid || 'Must be a 2 digit year';
        }
    }

    return (
        <div>
            <h3 className="cabin-heading">Order Total</h3>
            <div className="gap">
                <div className="order-total">
                    <div>
                        <ul className="person-total-list">
                            {travelers.map((traveler, index) => {
                                let cabin = cabins.find((cabin) => traveler.room === cabin.id)

                                return (
                                    <li key={index} className="person-total-item">{traveler.firstName} {traveler.lastName} - 1x {cabin.type} - {cabin.price},-</li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="total-price">
                        <div className="no-margin center">Total Price</div>
                        <h2 className="total-ticket-price">{totalPrice},-</h2>
                    </div>
                </div>
                <div>
                    <h4>Credit Card Information</h4>
                    <div>
                        <Input id="card-holder-name" label="Card Holder Name" value={payment.cardHolderName} type="text" validator={validator.cardHolderName}/>
                    </div>
                    <div className="grid-70-30">
                        <Input id="card-number" label="Card Number" value={payment.cardNumber} type="text" validator={validator.cardNumber}/>
                        <Input id="card-cvc" label="CVC/CVV" value={payment.csc} type="text" validator={validator.csc}/>
                    </div>
                    <div className="grid-70-30">
                        <div className="grid-2">
                            <Input recalculate={recalculateMonth} id="expiration-month" label="Exp Month" value={payment.expirationMonth} type="text" validator={validator.expirationMonth}/>
                            <Input id="expiration-year" label="Exp Year" value={payment.expirationYear} type="text" validator={validator.expirationYear}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;