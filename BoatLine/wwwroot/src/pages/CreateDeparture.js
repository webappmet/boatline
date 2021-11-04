import CreateDepartureForm from "../containers/CreateDepartureForm";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Stack from "../components/layout/Stack";
import H1 from "../components/type/H1";
import P from "../components/type/P";
import Panel from "../components/interface/module/Panel";
import { useHistory } from "react-router";
import { useAuthState } from "../context/user";
import { useEffect } from "react";

const CreateDeparture = ({  }) => {
    const history = useHistory();
    const auth = useAuthState();

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
                        <H1>Create Departures</H1>
                        <P>Create one or a series of departures.</P>
                    </Stack>
                    <Panel radius="1rem" padding="4rem">
                        <CreateDepartureForm />
                    </Panel>
                </Stack>
            </Section>
        </Container>
    );
}

export default CreateDeparture;