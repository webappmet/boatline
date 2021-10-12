import Input from '../../Input';
import './styled.css';

const Checkout = ({ payment, setPayment }) => {

    const validator = {
        cardNumber: (value) => {
            setPayment({...payment, cardNumber: value})
            return true;
        },
        csc: (value) => {
            setPayment({...payment, csc: value})
            return true;
        },
        cardHolderName:(value) => {
            setPayment({...payment, cardHolderName: value})
            return true;
        },
        expirationMonth: (value) => {
            setPayment({...payment, expirationMonth: value})
            return true;
        },
        expirationYear: (value) => {
            setPayment({...payment, expirationYear: value})
            return true;
        }
    }

    return (
        <div>
            <div>
                <Input id="card-holder-name" label="Card Holder Name" value={payment.cardHolderName} type="text" validator={validator.cardHolderName}/>
            </div>
            <div className="grid-70-30">
                <Input id="card-number" label="Card Number" value={payment.cardNumber} type="text" validator={validator.cardNumber}/>
                <Input id="card-cvc" label="CVC/CVV" value={payment.csc} type="text" validator={validator.csc}/>
            </div>
            <div className="grid-70-30">
                <div className="grid-2">
                    <Input id="expiration-month" label="Exp Month" value={payment.expirationMonth} type="text" validator={validator.expirationMonth}/>
                    <Input id="expiration-year" label="Exp Year" value={payment.expirationYear} type="text" validator={validator.expirationYear}/>
                </div>
            </div>
        </div>
    );
}

export default Checkout;