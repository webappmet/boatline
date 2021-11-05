import Button, { Text as ButtonText } from "../components/interface/control/Button";
import Panel from "../components/interface/module/Panel";
import Flex from "../components/layout/Flex";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Stack from "../components/layout/Stack";
import DepartureList from "../containers/DepartureList";
import { useAuthState } from "../context/user";
import { useEffect } from "react";
import { useHistory } from "react-router";
import H1 from '../components/type/H1';
import P from '../components/type/P';

const Departures = () => {
    const auth = useAuthState();
    const history = useHistory();

    useEffect(() => {
        if (!auth.user) {
            history.push('/');
        }
    }, [auth]);

    return (
        <Container>
            <Section>
                <Stack gap="5rem">
                    <Stack gap="1rem">
                        <H1>Departures</H1>
                        <P>Here you can change find, update and add new departures.</P>
                    </Stack>
                    <Panel radius="1rem" padding="4rem" color="var(--color-gw)">
                        <DepartureList />
                    </Panel>
                    <Flex>
                        <Button to="/dashboard">
                            <ButtonText>Back to dashboard</ButtonText>
                        </Button>
                        <Button to="/departures/create">
                            <ButtonText>Add departures</ButtonText>
                        </Button>
                    </Flex>
                </Stack>
            </Section>
        </Container>
    );
}

export default Departures;