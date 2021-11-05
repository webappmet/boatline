import styled from 'styled-components';
import Button, { Text as ButtonText } from "../interface/control/Button";
import Panel from "../interface/module/Panel";
import Flex from "../layout/Flex";
import P from '../type/P';

const Route = ({ route, remove }) => {

    return (
        <Panel cursor="pointer" color="var(--color-gw)" radius=".5rem" border="1px solid var(--color-gl)" padding="1rem">
            <Flex align="center">
                <P>{route.departure} - {route.destination} <Span>{route.durationDays}D{route.durationHours}H</Span></P>
                <Button action={() => remove(route.id)}>
                    <ButtonText>Delete</ButtonText>
                </Button>
            </Flex>
        </Panel>
    );
}

const Span = styled.span`
    font-weight: bold;
`

export default Route;