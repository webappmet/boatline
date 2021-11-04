import { useEffect, useState } from "react/cjs/react.development";
import { getCabin, upadateCabin } from "../api/cabin";
import Stack from "../components/layout/Stack";
import Space from "../components/layout/Space";
import Button, { Text as ButtonText } from "../components/interface/control/Button";
import Input from "../components/interface/control/Input";
import Align from "../components/layout/Align";
import { useToastDispatch } from "../context/toast";

const EditCabinFrom = ({ id }) => {
    const [beds, setBeds] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();

    const toastDispatch = useToastDispatch();

    const validateBeds = (value) => {
        const valid = value.match(/^[1-9][0-9]*$/)
        if (valid) setBeds(value);
        if (value === '') setBeds('');
        return true;
    }

    const validatePrice = (value) => {
        const valid = value.match(/^[1-9][0-9]*$/)
        if (valid) setPrice(value);
        if (value === '') setPrice('');
        return true;
    }

    const fetchCabin = async () => {
        const cabin = await getCabin(id);
        console.log(cabin)
        if (cabin) {
            setBeds(cabin.beds);
            setPrice(cabin.price);
            setType(cabin.type);
        }
    }

    const saveCabin = async () => {
        if (beds && price) {
            const result = await upadateCabin({ id, beds, price, type })
            if (result) toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Updated cabin', timer: 3000 } })
            else toastDispatch({ type: 'SHOW_MESSAGE', payload: { message: 'Could not update cabin', timer: 4000 } })
        }
    }

    const submit = () => {
        saveCabin();
    }

    useEffect(() => {
        fetchCabin();
    }, []);
    
    return (
        <Stack gap="3rem">
            <Space>
                <Input id="edit-cabin-beds" value={beds} type="number" label="Available Beds" validator={validateBeds}/>
                <Input id="edit-cabin-price" value={price} type="number" label="Price per person" validator={validatePrice}/>
            </Space>
            <Align align="right">
                <Button disabled={!beds || !price} action={() => submit()}>
                    <ButtonText>Update Cabin</ButtonText>
                </Button>
            </Align>
        </Stack>
    );
}

export default EditCabinFrom;